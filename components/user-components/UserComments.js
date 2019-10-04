import { CardStyled } from './style'
import moment from 'moment'
import {
  Tooltip,
  List,
  Comment,
  Card,
  Dropdown,
  Icon,
  message,
  Menu,
  Modal
} from 'antd'

const { confirm } = Modal

import Link from 'next/link'
import api from '../../api'

const UserComments = ({ comments, deleteComment }) => {
  const handleDelete = e => {
    console.log(e.key)
    confirm({
      title: 'Delete this comment permanently?',
      icon: <Icon type="exclamation-circle" style={{ color: '#ff4d4f' }} />,
      style: { top: 110 },
      maskClosable: true,
      okText: 'Confirm',
      okButtonProps: {
        style: {
          background: '#ff4d4f',
          borderColor: '#ff4d4f'
        }
      },
      onOk: async () => {
        try {
          const _result = await api.delete(`/comment/${e.key}`)
          message.success('Deleted comment successfully!', 2)
          deleteComment(e.key)
        } catch (error) {
          message.error(error.response.data.message)
        }
      }
    })
  }

  const getMenu = commentId => (
    <Menu onClick={handleDelete}>
      <Menu.Item key={commentId}>Delete comment</Menu.Item>
    </Menu>
  )

  comments.sort(
    (a, b) =>
      new Date(b.updatedTime).getTime() - new Date(a.updatedTime).getTime()
  )
  const formattedComments = comments.map(x => ({
    author: (
      <span
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'rgba(0, 0, 0, 0.65)'
        }}
      >
        {x.user.userId.includes('auth0') ? x.user.nickname : x.user.name}
      </span>
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
        {x.content
          .trim()
          .split('\n')
          .map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
      </div>
    ),
    datetime: (
      <div
        style={{
          display: 'flex'
        }}
      >
        <div>
          <Tooltip
            title={moment(x.updatedTime).format('D MMMM YYYY, h:mm:ss a')}
          >
            <span
              style={{
                fontSize: 14,
                color: 'rgba(0, 0, 0, 0.35)'
              }}
            >
              {moment(x.updatedTime).fromNow()} in{' '}
            </span>
          </Tooltip>
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

        <div
          style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.45)',
            marginLeft: 'auto'
          }}
        >
          <Dropdown overlay={getMenu(x.commentId)} trigger={['click']}>
            <Icon type="more" />
          </Dropdown>
        </div>
      </div>
    )
  }))

  return (
    <Card
      title="Comments"
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

export default UserComments
