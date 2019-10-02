import { Table } from 'antd'
import { CardStyled } from './style'
import styled from 'styled-components'
import Router from 'next/router'

const StyledTable = styled(Table)`
  .ant-table table {
    border-left: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
`

export default ({ sculptures }) => {
  const columns = [
    {
      title: 'Sculpture Name',
      dataIndex: 'name'
    },
    {
      title: 'Author',
      key: 'author',
      render: (_, { primaryMaker: { firstName, lastName } }) => (
        <span>{`${firstName} ${lastName}`}</span>
      )
    },
    {
      title: 'Likes',
      dataIndex: 'totalLikes',
      sorter: (a, b) => a.totalLikes - b.totalLikes,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Comments',
      dataIndex: 'totalComments',
      sorter: (a, b) => a.totalComments - b.totalComments,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Visits',
      dataIndex: 'totalVisits',
      sorter: (a, b) => a.totalVisits - b.totalVisits,
      sortDirections: ['descend', 'ascend']
    }
  ]

  return (
    <CardStyled title="Sculpture Rankings">
      <StyledTable
        dataSource={sculptures}
        columns={columns}
        pagination={{ pageSize: 10 }}
        className="sculpture-table"
        onRow={(record, _) => {
          return {
            onClick: () => {
              Router.push('/sculptures/id/[id]', `/sculptures/id/${record.key}`)
            }
          }
        }}
      />
    </CardStyled>
  )
}
