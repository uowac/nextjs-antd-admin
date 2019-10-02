import 'ant-design-pro/lib/Charts/style/index.less'
import Head from 'next/head'
import {
  ColStyled,
  UserCard,
  VisitCard,
  LikeCard,
  CommentCard,
  SculptureTable,
  UserPieChart
} from '../components/dashboard-components'
import { Row, Spin } from 'antd'

import moment from 'moment'
import { useAuth0 } from '../components/auth0-components'

import { useState, useEffect } from 'react'
import Auth from '../components/AuthPage'
import Loading from '../components/Loading'
import Error from 'next/error'
import api from '../api'

const Dashboard = () => {
  const [state, setState] = useState({})
  const [sculptures, setSculptures] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    const USER_DATA = []
    const VISIT_DATA = []
    const COMMENT_DATA = []
    const LIKE_DATA = []
    const beginDay = new Date().getTime()
    for (let i = 0; i < 30; i++) {
      const x = moment(new Date(beginDay - 1000 * 60 * 60 * 24 * i)).format(
        'YYYY-MM-DD'
      )
      USER_DATA.unshift({ x, y: Math.floor(Math.random() * 20) + 1 })
      VISIT_DATA.unshift({ x, y: Math.floor(Math.random() * 20) + 1 })
      COMMENT_DATA.unshift({ x, y: Math.floor(Math.random() * 20) + 1 })
      LIKE_DATA.unshift({ x, y: Math.floor(Math.random() * 20) + 1 })
    }

    const DAYS = 10 - 1

    const TOTAL_USERS = USER_DATA.reduce((total, cur) => total + cur.y, 0)
    const DAILY_USERS = USER_DATA[DAYS].y
    const DAILY_USERS_CHANGE = USER_DATA[DAYS].y - USER_DATA[DAYS - 1].y

    const TOTAL_VISITS = VISIT_DATA.reduce((total, cur) => total + cur.y, 0)
    const DAILY_VISITS = VISIT_DATA[DAYS].y
    const DAILY_VISITS_CHANGE = VISIT_DATA[DAYS].y - VISIT_DATA[DAYS - 1].y

    const TOTAL_LIKES = LIKE_DATA.reduce((total, cur) => total + cur.y, 0)
    const DAILY_LIKES = LIKE_DATA[DAYS].y
    const DAILY_LIKES_CHANGE = LIKE_DATA[DAYS].y - LIKE_DATA[DAYS - 1].y

    const TOTAL_COMMENTS = COMMENT_DATA.reduce((total, cur) => total + cur.y, 0)
    const DAILY_COMMENTS = COMMENT_DATA[DAYS].y
    const DAILY_COMMENTS_CHANGE =
      COMMENT_DATA[DAYS].y - COMMENT_DATA[DAYS - 1].y

    const fetchData = async () => {
      try {
        let sculpturesPromise = api.get('/sculpture')
        let usersPromise = api.get('/user')

        const [rawSculptures, rawUsers] = await Promise.all([
          sculpturesPromise,
          usersPromise
        ])

        const formattedSculptures = rawSculptures.data.map(x => ({
          ...x,
          key: x.accessionId,
          totalComments: +x.totalComments,
          totalLikes: +x.totalLikes,
          totalVisits: +x.totalVisits
        }))

        const formattedUsers = rawUsers.data.filter(x => !x.role)

        // console.log(formattedSculptures)
        // console.log(formattedUsers)
        setSculptures(formattedSculptures)
        setUsers(formattedUsers)
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

    setState({
      TOTAL_USERS,
      DAILY_USERS,
      DAILY_USERS_CHANGE,
      TOTAL_VISITS,
      DAILY_VISITS,
      DAILY_VISITS_CHANGE,
      TOTAL_LIKES,
      DAILY_LIKES,
      DAILY_LIKES_CHANGE,
      TOTAL_COMMENTS,
      DAILY_COMMENTS,
      DAILY_COMMENTS_CHANGE,
      USER_DATA,
      VISIT_DATA,
      LIKE_DATA,
      COMMENT_DATA
    })
  }, [])

  const {
    TOTAL_USERS,
    DAILY_USERS,
    DAILY_USERS_CHANGE,
    TOTAL_VISITS,
    DAILY_VISITS,
    DAILY_VISITS_CHANGE,
    TOTAL_LIKES,
    DAILY_LIKES,
    DAILY_LIKES_CHANGE,
    TOTAL_COMMENTS,
    DAILY_COMMENTS,
    DAILY_COMMENTS_CHANGE,
    USER_DATA,
    VISIT_DATA,
    LIKE_DATA,
    COMMENT_DATA
  } = state

  if (!isAuthenticated) return <Auth />
  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <>
      <Head>
        <title>Dashboard - UOW Sculptures</title>
      </Head>
      <Row gutter={16}>
        <ColStyled xs={24} sm={12}>
          <UserCard
            TOTAL_USERS={TOTAL_USERS}
            DAILY_USERS={DAILY_USERS}
            DAILY_USERS_CHANGE={DAILY_USERS_CHANGE}
            USER_DATA={USER_DATA}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <VisitCard
            TOTAL_VISITS={TOTAL_VISITS}
            DAILY_VISITS={DAILY_VISITS}
            DAILY_VISITS_CHANGE={DAILY_VISITS_CHANGE}
            VISIT_DATA={VISIT_DATA}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <LikeCard
            TOTAL_LIKES={TOTAL_LIKES}
            DAILY_LIKES={DAILY_LIKES}
            DAILY_LIKES_CHANGE={DAILY_LIKES_CHANGE}
            LIKE_DATA={LIKE_DATA}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <CommentCard
            TOTAL_COMMENTS={TOTAL_COMMENTS}
            DAILY_COMMENTS={DAILY_COMMENTS}
            DAILY_COMMENTS_CHANGE={DAILY_COMMENTS_CHANGE}
            COMMENT_DATA={COMMENT_DATA}
          />
        </ColStyled>

        <ColStyled xs={24}>
          <SculptureTable sculptures={sculptures} />
        </ColStyled>

        <ColStyled xs={24}>
          <UserPieChart users={users} />
        </ColStyled>
      </Row>
    </>
  )
}

export default Dashboard
