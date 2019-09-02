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
import { ColStyled, CardStyled, DescriptionIcon, ShadowCard } from './style'
import styled from 'styled-components'

const SculptureCard = ({
  idx,
  info: { key, name, visits, likes, comments }
}) => {
  return (
    // <Link href="https://twitch.tv/">
    <a style={{ display: 'inline-block', width: '100%' }}>
      <ShadowCard
        cover={
          <img
            alt="example"
            src={key % 2 === 1 ? '/static/img1.jpg' : '/static/img2.jpg'}
            style={{
              height: 250,
              width: '100%',
              objectFit: 'cover'
            }}
          />
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
            />
          }
        />
      </ShadowCard>
    </a>
    // </Link>
  )
}

const SculptureCardDescription = ({ likes, comments, visits }) => {
  return (
    <>
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

// sample data list
const originalList = [
  {
    key: '1',
    name: 'Sculpture Name 1',
    visits: 5,
    likes: 36,
    comments: 5
  },
  {
    key: '2',
    name: 'Sculpture Name 2',
    visits: 44,
    likes: 10,
    comments: 6
  },
  {
    key: '3',
    name: 'Sculpture Name 3',
    visits: 15,
    likes: 19,
    comments: 10
  },
  {
    key: '4',
    name: 'Sculpture Name 4',
    visits: 5,
    likes: 6,
    comments: 2
  },
  {
    key: '5',
    name: 'Sculpture Name 5',
    visits: 22,
    likes: 12,
    comments: 4
  },
  {
    key: '6',
    name: 'Sculpture Name 6',
    visits: 19,
    likes: 8,
    comments: 3
  },
  {
    key: '7',
    name: 'Sculpture Name 7',
    visits: 16,
    likes: 25,
    comments: 135
  },
  {
    key: '8',
    name: 'Sculpture Name 8',
    visits: 42,
    likes: 92,
    comments: 50
  },
  {
    key: '9',
    name: 'Sculpture Name 30',
    visits: 32,
    likes: 17,
    comments: 11
  },
  {
    key: '10',
    name: 'Sculpture Name 10',
    visits: 12,
    likes: 41,
    comments: 5
  }
]

originalList.sort((a, b) => a.name.localeCompare(b.name))

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
  const [filteredList, setFilteredList] = useState(originalList.slice())

  const [currentSort, setSort] = useState('Default')

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
      let newList = originalList.filter(sculpture =>
        sculpture.name.toLowerCase().includes(input.toLowerCase())
      )
      setFilteredList(sortBy(newList, currentSort))
    } else {
      if (filteredList.length !== originalList.length) {
        setFilteredList(sortBy(originalList.slice(), currentSort))
      }
    }
  }

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

            {/* drop down menu */}
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
                  <ColStyled xs={24} sm={12} md={8} key={sculpture.key}>
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
