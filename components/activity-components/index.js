/**
 * Description: Component for Recent activity page
 * Author: Hieu Chu
 */

import { useState, useEffect } from 'react'
import { Row } from 'antd'
import { ColStyled } from './style'
import api from '../../api'
import Loading from '../Loading'
import Error from 'next/error'
import Head from 'next/head'
import RecentComments from './RecentComments'
import RecentVisits from './RecentVisits'
import RecentLikes from './RecentLikes'

const RecentActivity = () => {
  const [comments, setComments] = useState([])
  const [visits, setVisits] = useState([])
  const [likes, setLikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const commentPromise = api.get('/comment')
        const visitPromise = api.get('/visit')
        const likePromise = api.get('/like')
        const [rawComments, rawVisits, rawLikes] = await Promise.all([
          commentPromise,
          visitPromise,
          likePromise
        ])
        setComments(rawComments.data)
        setVisits(rawVisits.data)
        setLikes(rawLikes.data)
        console.log('comments', rawComments.data)
        console.log('visits', rawVisits.data)
        console.log('likes', rawLikes.data)
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
  }, [])

  const deleteComment = commentId => {
    setComments(c => c.filter(x => x.commentId !== commentId))
  }

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <>
      <Head>
        <title>Recent Activity - UOW Sculptures</title>
      </Head>

      <Row gutter={16}>
        <ColStyled xs={24} lg={12}>
          <RecentComments comments={comments} deleteComment={deleteComment} />
          <RecentVisits visits={visits} />
        </ColStyled>

        <ColStyled xs={24} lg={12}>
          <RecentLikes likes={likes} />
        </ColStyled>
      </Row>
    </>
  )
}

export default RecentActivity
