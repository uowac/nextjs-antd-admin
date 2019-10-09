import { CardStyled, EmptyImage } from './style'
import moment from 'moment'
import { Tooltip, List, Comment, Card, Empty } from 'antd'
import Link from 'next/link'

const UserVisit = ({ visits }) => {
  visits.sort(
    (a, b) => new Date(b.visitTime).getTime() - new Date(a.visitTime).getTime()
  )
  visits.forEach(x => {
    x.sculpture.images.sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    )
  })

  const formattedComments = visits.map(x => ({
    author: (
      <span>
        <Link href="/sculptures/id/[id]" as={`/sculptures/id/${x.sculptureId}`}>
          <a
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: 'rgba(0, 0, 0, 0.65)'
            }}
          >
            {x.sculpture.name}
          </a>
        </Link>
      </span>
    ),
    avatar: (
      <div>
        <img
          src={
            x.sculpture.images.length
              ? x.sculpture.images[0].url
              : '../../static/no-image.png'
          }
          style={{
            width: 42,
            height: 42,
            objectFit: 'cover',
            borderRadius: 4
          }}
        />
      </div>
    ),
    content: (
      <div
        style={{
          fontSize: 14
        }}
      >
        <Tooltip title={moment(x.visitTime).format('D MMMM YYYY, h:mm:ss a')}>
          <span
            style={{
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.35)'
            }}
          >
            {moment(x.visitTime).fromNow()}
          </span>
        </Tooltip>
      </div>
    )
  }))

  return (
    <Card
      title="Visits"
      bodyStyle={{ padding: '20px 24px 0px' }}
      bordered={false}
      style={{ marginTop: 12 }}
    >
      <List
        itemLayout="horizontal"
        dataSource={formattedComments}
        className="comment-list"
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="No Visits"
            />
          )
        }}
        renderItem={item => (
          <li>
            <Comment
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              className="comment"
            />
          </li>
        )}
        pagination={{ pageSize: 15, hideOnSinglePage: true }}
      />
    </Card>
  )
}

export default UserVisit
