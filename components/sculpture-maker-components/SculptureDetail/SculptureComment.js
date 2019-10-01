import { CardStyled } from '../style'
import moment from 'moment'
import { Tooltip, List, Comment, Card } from 'antd'

const SculptureComment = ({ comments }) => {
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
        {x.user.name}
      </span>
    ),
    avatar: (
      <img
        src={x.user.picture}
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%'
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
      <Tooltip title={moment(x.updatedTime).format('D MMMM YYYY, h:mm:ss a')}>
        <span
          style={{
            fontSize: 14,
            color: 'rgba(0, 0, 0, 0.35)'
          }}
        >
          {moment(x.updatedTime).fromNow()}
        </span>
      </Tooltip>
    )
  }))

  return (
    <Card
      title="Comments"
      bodyStyle={{ padding: '20px 24px 0px' }}
      bordered={false}
      style={{ marginTop: 12 }}
    >
      <List
        itemLayout="horizontal"
        dataSource={formattedComments}
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
      />
    </Card>
  )
}

export default SculptureComment
