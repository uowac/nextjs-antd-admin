import { Button, notification } from 'antd'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import React from 'react'

const StyledButton = styled(Button)`
  color: red;
  ${() => css`
    color: yellow;
  `}
`

const openNotificationWithIcon = type => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.'
  })
}

const Home = () => {
  return (
    <div
      style={{
        marginLeft: 10,
        marginTop: 10
      }}
    >
      <Link href="/dashboard">
        <StyledButton type="primary" shape="round">
          Go to About page
        </StyledButton>
      </Link>

      <div>
        <Button onClick={() => openNotificationWithIcon('success')}>
          Success
        </Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>
          Warning
        </Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </div>
    </div>
  )
}

export default Home
