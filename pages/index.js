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

const formatDailyData = rawData => {
  const result = []
  for (let date of Object.keys(rawData)) {
    result.push({
      x: moment(date).format('MMM D YYYY'),
      y: rawData[date]
    })
  }
  // sort in correct order
  result.sort((a, b) => moment(a.x).valueOf() - moment(b.x).valueOf)

  return result
}

const Dashboard = () => {
  const [state, setState] = useState({})
  const [sculptures, setSculptures] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const defaultStartDate = moment(new Date())
  const defaultEndDate = moment(defaultStartDate).subtract(7, 'days')

  const [startDate, setStartDate] = useState(defaultStartDate)
  const [endDate, setEndDate] = useState(defaultEndDate)

  const { isAuthenticated } = useAuth0()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let sculpturesPromise = api.get('/sculpture')
        let usersPromise = api.get('/user')
        let totalLikesPromise = api.get('/stats/total/likes')
        let totalCommentsPromise = api.get('/stats/total/comments')
        let totalVisitsPromise = api.get('/stats/total/visits')

        const today = startDate.format('YYYY-MM-DD')
        const past = endDate.format('YYYY-MM-DD')
        console.log('past', past)
        console.log('today', today)

        const likesPromise = api.get(
          `/stats/likes?fromDate=${past}&toDate=${today}`
        )
        const commentsPromise = api.get(
          `/stats/comments?fromDate=${past}&toDate=${today}`
        )
        const visitPromise = api.get(
          `/stats/visits?fromDate=${past}&toDate=${today}`
        )
        const userStatsPromise = api.get(
          `/stats/users?fromDate=${past}&toDate=${today}`
        )

        const [
          rawSculptures,
          rawUsers,
          {
            data: { totalLikes }
          },
          {
            data: { totalComments }
          },
          {
            data: { totalVisits }
          },
          { data: rawLikes },
          { data: rawComments },
          { data: rawVisits },
          { data: rawUserStats }
        ] = await Promise.all([
          sculpturesPromise,
          usersPromise,
          totalLikesPromise,
          totalCommentsPromise,
          totalVisitsPromise,
          likesPromise,
          commentsPromise,
          visitPromise,
          userStatsPromise
        ])

        // format daily data statistics
        const USER_DATA = formatDailyData(rawUserStats)
        const LIKE_DATA = formatDailyData(rawLikes)
        const COMMENT_DATA = formatDailyData(rawComments)
        const VISIT_DATA = formatDailyData(rawVisits)

        const DAILY_USERS = USER_DATA[USER_DATA.length - 1].y
        const DAILY_USERS_CHANGE =
          DAILY_USERS - USER_DATA[USER_DATA.length - 2].y

        const DAILY_VISITS = VISIT_DATA[VISIT_DATA.length - 1].y
        const DAILY_VISITS_CHANGE =
          DAILY_VISITS - VISIT_DATA[VISIT_DATA.length - 2].y

        const DAILY_LIKES = LIKE_DATA[LIKE_DATA.length - 1].y
        const DAILY_LIKES_CHANGE =
          DAILY_LIKES - LIKE_DATA[LIKE_DATA.length - 2].y

        const DAILY_COMMENTS = COMMENT_DATA[COMMENT_DATA.length - 1].y
        const DAILY_COMMENTS_CHANGE =
          DAILY_COMMENTS - COMMENT_DATA[COMMENT_DATA.length - 2].y

        const formattedSculptures = rawSculptures.data.map(x => ({
          ...x,
          key: x.accessionId,
          totalComments: +x.totalComments,
          totalLikes: +x.totalLikes,
          totalVisits: +x.totalVisits
        }))

        const formattedUsers = rawUsers.data.filter(x => !x.role)

        setSculptures(formattedSculptures)
        setUsers(formattedUsers)

        setState({
          TOTAL_USERS: formattedUsers.length,
          DAILY_USERS,
          DAILY_USERS_CHANGE,
          TOTAL_VISITS: totalVisits,
          DAILY_VISITS,
          DAILY_VISITS_CHANGE,
          TOTAL_LIKES: totalLikes,
          DAILY_LIKES,
          DAILY_LIKES_CHANGE,
          TOTAL_COMMENTS: totalComments,
          DAILY_COMMENTS,
          DAILY_COMMENTS_CHANGE,
          USER_DATA,
          VISIT_DATA,
          LIKE_DATA,
          COMMENT_DATA
        })
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
  }, [endDate, startDate])

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
            startDate={startDate}
            endDate={endDate}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <VisitCard
            TOTAL_VISITS={TOTAL_VISITS}
            DAILY_VISITS={DAILY_VISITS}
            DAILY_VISITS_CHANGE={DAILY_VISITS_CHANGE}
            VISIT_DATA={VISIT_DATA}
            startDate={startDate}
            endDate={endDate}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <LikeCard
            TOTAL_LIKES={TOTAL_LIKES}
            DAILY_LIKES={DAILY_LIKES}
            DAILY_LIKES_CHANGE={DAILY_LIKES_CHANGE}
            LIKE_DATA={LIKE_DATA}
            startDate={startDate}
            endDate={endDate}
          />
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <CommentCard
            TOTAL_COMMENTS={TOTAL_COMMENTS}
            DAILY_COMMENTS={DAILY_COMMENTS}
            DAILY_COMMENTS_CHANGE={DAILY_COMMENTS_CHANGE}
            COMMENT_DATA={COMMENT_DATA}
            startDate={startDate}
            endDate={endDate}
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
