import { CardStyled } from './style'
import moment from 'moment'
import { Tooltip, List, Comment, Card } from 'antd'
import Link from 'next/link'

const UserLikes = ({ likes }) => {
  likes.sort(
    (a, b) => new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
  )
  const formattedComments = likes.map(x => ({
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
      <img
        src={x.sculpture.images[0].url}
        style={{
          width: 42,
          height: 42,
          borderRadius: 4
        }}
      />
    ),
    content: (
      <div
        style={{
          fontSize: 14
        }}
      >
        <Tooltip title={moment(x.likedTime).format('D MMMM YYYY, h:mm:ss a')}>
          <span
            style={{
              fontSize: 14,
              color: 'rgba(0, 0, 0, 0.35)'
            }}
          >
            {moment(x.likedTime).fromNow()}
          </span>
        </Tooltip>
      </div>
    )
  }))

  return (
    <Card
      title="Likes"
      bodyStyle={{ padding: '20px 24px 0px' }}
      bordered={false}
      style={{ marginTop: 12 }}
    >
      <List
        itemLayout="horizontal"
        dataSource={formattedComments}
        className="comment-list"
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
        pagination={{ pageSize: 25, hideOnSinglePage: true }}
      />
    </Card>
  )
}

export default UserLikes
