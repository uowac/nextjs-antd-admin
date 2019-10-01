import { useState, useEffect } from 'react'
import {
  Row,
  Divider,
  Modal,
  Icon,
  message,
  notification,
  Button,
  Comment
} from 'antd'
import { ColStyled, CardStyled, StyledTable } from './style'
import api from '../../api'
import Loading from '../Loading'
import Error from 'next/error'
import moment from 'moment'

const UserList = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let users = (await api.get('/user')).data
        users = users
          .filter(x => !x.role)
          .map(x => ({
            ...x,
            key: x.userId
          }))

        users.sort(
          (a, b) =>
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
        )
        console.log(users)

        setUserList(users)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const [userList, setUserList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => {
        const { email, name, nickname, picture, userId } = record
        let author = name
        if (userId.includes('auth0')) author = nickname

        return (
          <Comment
            author={
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'rgba(0, 0, 0, 0.65)'
                }}
              >
                {author}
              </span>
            }
            avatar={
              <img
                src={picture}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%'
                }}
              />
            }
            content={
              <div
                style={{
                  fontSize: 14
                }}
              >
                {email}
              </div>
            }
          />
        )
      }
    },
    {
      title: 'Connection type',
      key: 'connection',
      render: (_, record) => {
        let connection = ''
        if (record.userId.includes('google')) {
          connection = 'Google'
        } else if (record.userId.includes('facebook')) {
          connection = 'Facebook'
        } else {
          connection = 'Email'
        }
        return <span>{connection}</span>
      }
    },
    {
      title: 'Join date',
      key: 'joinDate',
      render: (_, record) => {
        return <span>{moment(record.joinDate).format('D MMMM YYYY')}</span>
      }
    }
  ]

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="User Management">
          <StyledTable
            dataSource={userList}
            columns={columns}
            pagination={{ pageSize: 20 }}
            className="user-table"
            // style={{ maxWidth: 750 }}
          />
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default UserList
