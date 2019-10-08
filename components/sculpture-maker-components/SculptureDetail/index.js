import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Row, Carousel, Typography, List, Empty, Button, Tooltip } from 'antd'
import { ColStyled, CardStyled } from '../style'
import { SculptureCardDescription } from '../SculptureGrid'
import api from '../../../api'
import Loading from '../../Loading'
import Error from 'next/error'
import MyStaticMap from '../../map-components/StaticMap'
import Link from 'next/link'
import Head from 'next/head'
import SculptureComment from './SculptureComment'
import { format } from 'path'
import moment from 'moment'
import SculptureTrend from './SculptureTrend'

const { Text, Title, Paragraph } = Typography

const SculptureDetail = () => {
  const [sculpture, setSculpture] = useState({})
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sculpturePromise = api.get(`/sculpture/${id}`)
        const commentPromise = api.get(`/comment/sculpture-id/${id}`)

        const [rawSculpture, rawComments] = await Promise.all([
          sculpturePromise,
          commentPromise
        ])

        setComments(rawComments.data)
        console.log('hhhh', rawComments.data)
        setSculpture(rawSculpture.data)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
      setLoading(false)
    }

    fetchData()
  }, [id])

  const deleteComment = commentId => {
    setComments(c => c.filter(x => x.commentId !== commentId))
    setSculpture(x => ({
      ...x,
      totalComments: x.totalComments - 1
    }))
  }

  const addComment = comment => {
    setComments(c => [comment, ...c])
  }

  const router = useRouter()
  const id = router.query.id

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  const {
    images,
    name,
    primaryMaker,
    accessionId,
    longitude,
    latitude,
    productionDate,
    material,
    creditLine,
    locationNotes,
    totalLikes,
    totalComments,
    totalVisits
  } = sculpture

  const { birthYear, deathYear, nationality, wikiUrl } = primaryMaker

  const markerLat = Number(latitude)
  const markerLng = Number(longitude)

  images.sort(
    (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
  )
  const imageList = images.map((image, idx) => (
    <div key={idx}>
      <img src={image.url} />
    </div>
  ))

  return (
    <>
      <Head>
        <title>{name} - UOW Sculptures</title>
      </Head>

      <Row gutter={16}>
        <ColStyled xs={24} lg={15}>
          <CardStyled
            title="Sculpture Details"
            extra={
              <Link
                href="/sculptures/id/[id]/edit"
                as={`/sculptures/id/${id}/edit`}
              >
                <a>
                  <Button icon="edit">Edit details</Button>
                </a>
              </Link>
            }
          >
            <Carousel
              draggable
              style={{
                width: '100%'
              }}
            >
              {images.length ? (
                imageList
              ) : (
                <div>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{ height: 100, marginTop: 100 }}
                  />
                </div>
              )}
            </Carousel>
            <div
              style={{
                marginTop: 15
              }}
            >
              <Title level={4} style={{ marginBottom: 0 }}>
                {name}
              </Title>
              <SculptureCardDescription
                totalLikes={totalLikes}
                totalComments={totalComments}
                totalVisits={totalVisits}
                makerName={primaryMaker.firstName + ' ' + primaryMaker.lastName}
              />

              <List itemLayout="horizontal">
                <List.Item>
                  <List.Item.Meta
                    title="Accession ID"
                    description={
                      !accessionId.includes('unknown') ? accessionId : 'N/A'
                    }
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="Production Date"
                    description={productionDate ? productionDate : 'N/A'}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="Material"
                    description={material ? material : 'N/A'}
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="Credit Line"
                    description={
                      creditLine
                        ? creditLine
                            .trim()
                            .split('\n')
                            .map((line, idx) => <div key={idx}>{line}</div>)
                        : 'N/A'
                    }
                  />
                </List.Item>
                <List.Item>
                  <List.Item.Meta
                    title="Location Details"
                    description={
                      locationNotes
                        ? locationNotes
                            .trim()
                            .split('\n')
                            .map((line, idx) => <div key={idx}>{line}</div>)
                        : 'N/A'
                    }
                  />
                </List.Item>
              </List>
            </div>
          </CardStyled>

          <SculptureTrend
            totalLikes={totalLikes}
            totalComments={totalComments}
            totalVisits={totalVisits}
            sculptureId={id}
          />
        </ColStyled>
        {/* Maker detail */}
        <ColStyled xs={24} lg={9}>
          <MyStaticMap markerLat={markerLat} markerLng={markerLng} />
          <CardStyled title="Primary maker details" style={{ marginTop: 10 }}>
            <List
              itemLayout="horizontal"
              style={{
                marginTop: -20
              }}
            >
              <List.Item>
                <List.Item.Meta
                  title="Full Name"
                  description={
                    primaryMaker.firstName + ' ' + primaryMaker.lastName
                  }
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Nationality"
                  description={nationality ? nationality : 'N/A'}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Born"
                  description={birthYear ? birthYear : 'N/A'}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Passed away"
                  description={deathYear ? deathYear : 'N/A'}
                />
              </List.Item>
              <List.Item>
                <List.Item.Meta
                  title="Website"
                  description={
                    wikiUrl ? <a href={`${wikiUrl}`}>{wikiUrl}</a> : 'N/A'
                  }
                />
              </List.Item>
            </List>
          </CardStyled>

          <SculptureComment
            comments={comments}
            deleteComment={deleteComment}
            addComment={addComment}
            sculptureId={id}
          />
        </ColStyled>
      </Row>
    </>
  )
}

export default SculptureDetail
