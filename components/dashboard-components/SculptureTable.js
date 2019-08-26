import { Table } from 'antd'
import { CardStyled } from './style'
import styled from 'styled-components'

const StyledTable = styled(Table)`
  .ant-table table {
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
`

export default () => {
  const dataSource = [
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
      likes: 15,
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
      likes: 22,
      comments: 10
    }
  ]

  const columns = [
    {
      title: 'Sculpture Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },

    {
      title: 'Likes',
      dataIndex: 'likes',
      sorter: (a, b) => a.likes - b.likes,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      sorter: (a, b) => a.comments - b.comments,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Visits',
      dataIndex: 'visits',
      sorter: (a, b) => a.visits - b.visits,
      sortDirections: ['descend', 'ascend']
    }
  ]

  return (
    <CardStyled title="Sculpture Rankings">
      <StyledTable
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
      />
    </CardStyled>
  )
}
