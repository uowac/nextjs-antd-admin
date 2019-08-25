import { useState, useEffect } from 'react'
import { Row, Card, Typography, Tooltip, Input, Empty } from 'antd'
// const { Text } = Typography
const { Meta } = Card
const { Search } = Input
import Link from 'next/link'
import { ColStyled, CardStyled, DescriptionIcon } from './style'

const heyDude = Typography.Text
const heyheyhey = Typography.Paragraph

const SculptureCard = ({ idx, info: { name } }) => {
  return (
    <Link href="https://twitch.tv/">
      <a style={{ display: 'inline-block' }}>
        <CardStyled
          hoverable
          cover={
            <img
              alt="example"
              src={idx % 2 === 0 ? '/static/img1.jpg' : '/static/img2.jpg'}
              style={{
                height: 250,
                // width: 'auto',
                objectFit: 'cover'
              }}
            />
          }
          bordered={true}
        >
          <Meta title={name} description={<SculptureCardDescription />} />
        </CardStyled>
      </a>
    </Link>
  )
}

const SculptureCardDescription = () => {
  return (
    <>
      <Tooltip placement="top" title="Likes">
        <DescriptionIcon
          type="heart"
          theme="twoTone"
          twoToneColor="#eb2f96"
          style={{ marginRight: 4 }}
        />
      </Tooltip>

      <span style={{ marginRight: 8 }}>15</span>
      <Tooltip placement="top" title="Comments">
        <DescriptionIcon
          type="message"
          theme="twoTone"
          twoToneColor="rgb(205, 34, 255)"
          style={{ marginRight: 4 }}
        />
      </Tooltip>
      <span style={{ marginRight: 5 }}>20</span>
      <Tooltip placement="top" title="Visits">
        <DescriptionIcon
          type="environment"
          style={{ color: '#F73F3F', marginRight: 3 }}
        />
      </Tooltip>
      <span style={{ marginRight: 4 }}>25</span>
    </>
  )
}

// sample data list
const originalList = new Array(10).fill(0).map((_, idx) => ({
  name: 'Sculpture Name ' + idx
}))

const SculptureGrid = () => {
  const [filteredList, setFilteredList] = useState(originalList)

  const handleChange = e => {
    const input = e.target.value
    if (input.length >= 3) {
      setFilteredList(
        originalList.filter(sculpture =>
          sculpture.name.toLowerCase().includes(input.toLowerCase())
        )
      )
    } else {
      if (filteredList.length !== originalList.length) {
        setFilteredList(originalList)
      }
    }
  }

  return (
    <Row
      gutter={16}
      style={{
        marginTop: 20,
        marginLeft: 12,
        marginRight: 12,
        marginBottom: 15
      }}
    >
      <ColStyled xs={24}>
        <CardStyled title="Sculpture Collection">
          <div style={{ marginLeft: 8, marginRight: 8, marginBottom: 16 }}>
            <Search
              allowClear
              placeholder="Enter search term"
              onChange={handleChange}
              size="large"
            />
          </div>
          <>
            {!filteredList.length ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No Data :("
                style={{ marginTop: 60 }}
              />
            ) : (
              filteredList.map((sculpture, idx) => {
                return (
                  <ColStyled xs={24} sm={12} md={8} key={idx}>
                    <SculptureCard idx={idx} info={sculpture} />
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

export default () => 'hello world'
