import { useState, useEffect } from 'react'
import {
  Row,
  Card,
  Typography,
  Tooltip,
  Input,
  Empty,
  Button,
  Dropdown,
  Icon,
  Menu
} from 'antd'
const { Text } = Typography
const { Meta } = Card
const { Search } = Input
import Link from 'next/link'
import {
  ColStyled,
  CardStyled,
  DescriptionIcon,
  ShadowCard,
  Subtitle,
  EmptyImage
} from './style'
import Loading from '../Loading'
import Error from 'next/error'
import api from '../../api'

const SculptureCard = ({
  info: { accessionId, name, visits, likes, comments, primaryMaker, images }
}) => {
  const makerName = primaryMaker.firstName + ' ' + primaryMaker.lastName
  return (
    <Link href={`/sculptures/id/${accessionId}`}>
      <a style={{ display: 'inline-block', width: '100%' }}>
        <ShadowCard
          cover={
            images.length ? (
              <div style={{ height: 450 }}>
                <img
                  src={images[0].url}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ) : (
              <EmptyImage image={Empty.PRESENTED_IMAGE_SIMPLE} />
              // <div style={{ height: 450, border: '1px solid black' }}>hey</div>
            )
          }
          bordered={true}
        >
          <Meta
            title={name}
            description={
              <SculptureCardDescription
                visits={visits}
                likes={likes}
                comments={comments}
                makerName={makerName}
              />
            }
          />
        </ShadowCard>
      </a>
    </Link>
  )
}

export const SculptureCardDescription = ({
  likes,
  comments,
  visits,
  makerName
}) => {
  return (
    <>
      <Subtitle type="secondary">{makerName}</Subtitle>
      <Tooltip placement="top" title="Likes">
        <DescriptionIcon
          type="heart"
          theme="twoTone"
          twoToneColor="#eb2f96"
          style={{ marginRight: 4 }}
        />
        <Text type="secondary" style={{ marginRight: 8 }}>
          {likes}
        </Text>
      </Tooltip>

      <Tooltip placement="top" title="Comments">
        <DescriptionIcon
          type="message"
          theme="twoTone"
          twoToneColor="rgb(205, 34, 255)"
          style={{ marginRight: 4 }}
        />
        <Text type="secondary" style={{ marginRight: 5 }}>
          {comments}
        </Text>
      </Tooltip>

      <Tooltip placement="top" title="Visits">
        <DescriptionIcon
          type="environment"
          style={{ color: '#F73F3F', marginRight: 3 }}
        />
        <Text type="secondary" style={{ marginRight: 4 }}>
          {visits}
        </Text>
      </Tooltip>
    </>
  )
}

// custom sort function
const sortBy = (list, criterion) => {
  switch (criterion) {
    case 'Likes':
      return list.slice().sort((a, b) => b.likes - a.likes)
    case 'Comments':
      return list.slice().sort((a, b) => b.comments - a.comments)
    case 'Visits':
      return list.slice().sort((a, b) => b.visits - a.visits)
    case 'Default':
      return list.slice().sort((a, b) => a.name.localeCompare(b.name))
  }
}

const SculptureGrid = () => {
  const [originalList, setOriginalList] = useState([])
  const [filteredList, setFilteredList] = useState(originalList.slice())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [currentSort, setSort] = useState('Default')

  useEffect(() => {
    const fetchSculpture = async () => {
      try {
        let { data } = await api.get('/sculpture')
        data.sort((a, b) => a.name.localeCompare(b.name))
        console.log(data)
        setOriginalList(data)
        setFilteredList(data)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
      setLoading(false)
    }

    fetchSculpture()
  }, [])

  // Menu handler
  function handleMenuClick(e) {
    // console.log('click', e.key)
    setSort(e.key)
    setFilteredList(filteredList => sortBy(filteredList, e.key))
  }

  // Menu list UI overlay
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Default">Default</Menu.Item>
      <Menu.Item key="Likes">Likes</Menu.Item>
      <Menu.Item key="Comments">Comments</Menu.Item>
      <Menu.Item key="Visits">Visits</Menu.Item>
    </Menu>
  )

  const handleChange = e => {
    const input = e.target.value
    if (input.length >= 3) {
      let newList = originalList.filter(sculpture => {
        let makerName =
          sculpture.primaryMaker.firstName +
          ' ' +
          sculpture.primaryMaker.lastName

        return (
          sculpture.name.toLowerCase().includes(input.toLowerCase()) ||
          makerName.toLowerCase().includes(input.toLowerCase())
        )
      })
      setFilteredList(sortBy(newList, currentSort))
    } else {
      if (filteredList.length !== originalList.length) {
        setFilteredList(sortBy(originalList.slice(), currentSort))
      }
    }
  }

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled
          title="Sculpture Collection"
          extra={
            <Link href="/sculptures/create">
              <a>
                <Button type="primary" icon="plus">
                  Add new sculpture
                </Button>
              </a>
            </Link>
          }
        >
          <div
            style={{
              marginLeft: 8,
              marginRight: 8,
              marginBottom: 16,
              display: 'flex'
            }}
          >
            <Search
              allowClear
              placeholder="Enter search term"
              onChange={handleChange}
              size="large"
              style={{
                marginRight: 8
              }}
            />

            <Dropdown overlay={menu} trigger={['click']}>
              <Button size="large">
                <Icon type="sort-ascending" /> {currentSort}{' '}
                <Icon type="down" />
              </Button>
            </Dropdown>
          </div>

          <>
            {!filteredList.length ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Data :("
                style={{ marginTop: 60 }}
              />
            ) : (
              filteredList.map(sculpture => {
                return (
                  <ColStyled xs={24} sm={12} md={8} key={sculpture.accessionId}>
                    <SculptureCard info={sculpture} />
                  </ColStyled>
                )
              })
            )}
          </>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureGrid
