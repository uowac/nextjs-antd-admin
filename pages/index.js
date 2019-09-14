import 'ant-design-pro/lib/Charts/style/index.less'
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

const Dashboard = () => {
  const [state, setState] = useState({})
  const [loading, setLoading] = useState(true)
  const { isAuthenticated, user } = useAuth0()

  useEffect(() => {
    const USER_DATA = []
    const VISIT_DATA = []
    const COMMENT_DATA = []
    const LIKE_DATA = []
    const beginDay = new Date().getTime()
    for (let i = 0; i < 10; i++) {
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

    setLoading(false)
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

  return (
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
        <SculptureTable />
      </ColStyled>

      <ColStyled xs={24}>
        <UserPieChart />
      </ColStyled>
    </Row>
  )
}

export default Dashboard
