import { useState, useEffect, useRef } from 'react'
import { Row, Comment, Icon, Input, Button } from 'antd'
import { ColStyled, CardStyled, StyledTable } from './style'
import api from '../../api'
import Loading from '../Loading'
import Error from 'next/error'
import moment from 'moment'
import Router from 'next/router'
import { convertNonAccent } from '../shared/utils'

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
  const searchInput = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getUserSearchProps = () => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder="Search user"
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm)}
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : '#7E7E7E' }} />
    ),
    onFilter: (value, record) => {
      const { email, name, nickname, userId } = record
      let author = name
      if (userId.includes('auth0')) author = nickname

      return (
        convertNonAccent(author.toLowerCase()).includes(value.toLowerCase()) ||
        convertNonAccent(email.toLowerCase()).includes(value.toLowerCase())
      )
    },
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select())
      }
    }
  })

  const handleSearch = (selectedKeys, confirm) => {
    confirm()
  }

  const handleReset = clearFilters => {
    clearFilters()
  }

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
                  width: 42,
                  height: 42,
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
      },
      ...getUserSearchProps()
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
      },
      filters: [
        {
          text: 'Email',
          value: 'auth0'
        },
        {
          text: 'Google',
          value: 'google'
        },
        {
          text: 'Facebook',
          value: 'facebook'
        }
      ],
      onFilter: (value, record) => record.userId.includes(value)
    },
    {
      title: 'Join date',
      key: 'joinDate',
      render: (_, record) => {
        return <span>{moment(record.joinDate).format('D MMMM YYYY')}</span>
      },
      sorter: (a, b) =>
        new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
      sortDirections: ['ascend', 'descend']
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
            pagination={{ pageSize: 25, hideOnSinglePage: true }}
            className="user-table"
            onRow={(record, _) => {
              return {
                onClick: () => {
                  Router.push('/users/id/[id]', `/users/id/${record.key}`)
                }
              }
            }}
            onChange={(pagination, filters, sorter, { currentDataSource }) => {
              console.log('cur', currentDataSource)
            }}
          />
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default UserList
