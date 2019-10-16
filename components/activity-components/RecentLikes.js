/**
 * Description: Recent likes component
 * Author: Hieu Chu
 */

import moment from 'moment'
import { Tooltip, List, Comment, Card } from 'antd'
import Link from 'next/link'

const RecentLikes = ({ likes }) => {
  likes.sort(
    (a, b) => new Date(b.likedTime).getTime() - new Date(a.likedTime).getTime()
  )
  const formattedComments = likes.map(x => ({
    author: (
      <Link href="/users/id/[id]" as={`/users/id/${x.user.userId}`}>
        <a
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.65)'
          }}
        >
          {x.user.userId.includes('auth0') ? x.user.nickname : x.user.name}
        </a>
      </Link>
    ),
    avatar: (
      <img
        src={x.user.picture}
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          objectFit: 'cover'
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
    ),
    datetime: (
      <div>
        <span
          style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.35)'
          }}
        >
          liked{' '}
        </span>
        <Link
          href="/sculptures/id/[id]"
          as={`/sculptures/id/${x.sculpture.accessionId}`}
        >
          <a
            style={{
              fontSize: 14
            }}
          >
            {x.sculpture.name}
          </a>
        </Link>
      </div>
    )
  }))

  return (
    <Card
      title="Recent Likes"
      bodyStyle={{ padding: '20px 24px 0px' }}
      bordered={false}
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
              datetime={item.datetime}
              className="comment"
            />
          </li>
        )}
        pagination={{ pageSize: 15, hideOnSinglePage: true }}
      />
    </Card>
  )
}

export default RecentLikes
