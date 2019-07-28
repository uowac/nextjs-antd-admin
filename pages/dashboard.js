import { useEffect } from 'react'
import { Row, Col, Card, Divider, Icon, Tooltip, Skeleton } from 'antd'
import Layout from '../components/Layout'
import { NumberInfo } from 'ant-design-pro'
import styled from 'styled-components'

const CardStyled = props => (
  <Card
    bodyStyle={{ padding: '20px 24px 8px' }}
    style={{ height: 131 }}
    {...props}
  />
)

const NumberInfoStyled = props => (
  <NumberInfo
    {...props}
    total={<span style={{ fontSize: 30 }}>{props.total.toLocaleString()}</span>}
    style={{ display: 'inline-block' }}
  />
)

const HelperIcon = props => (
  <div style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
    <Tooltip {...props} placement="topLeft" arrowPointAtCenter={true}>
      <Icon
        type="info-circle"
        style={{ verticalAlign: -3, cursor: 'pointer' }}
      />
    </Tooltip>
  </div>
)

const MainIcon = props => (
  <div style={{ marginRight: 16 }}>
    <Icon {...props} style={{ ...props.style, fontSize: 54 }} />
  </div>
)

const CardFooter = props => {
  return (
    <div>
      <span>{props.title}:</span>
      <span style={{ marginLeft: 8, color: 'rgba(0,0,0,.85)' }}>
        {props.value.toLocaleString()}
      </span>
      <span style={{ marginLeft: 16 }}>
        <Tooltip title="Change compared to yesterday">
          <span style={{ color: 'rgba(0,0,0,.55)', marginRight: 2 }}>
            {props.change.toLocaleString()}
          </span>

          {/* Up/down icon  */}
          {props.change < 0 ? (
            <Icon
              type="caret-down"
              style={{ color: '#f5222d', verticalAlign: 'text-bottom' }}
            />
          ) : (
            <Icon
              type="caret-up"
              style={{ color: '#52c41a', verticalAlign: 'middle' }}
            />
          )}
        </Tooltip>
      </span>
    </div>
  )
}

const ColStyled = styled(Col)`
  padding-bottom: 12px;
`

const CardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 9px;
`

export default () => {
  const TOTAL_USERS = 124
  const DAILY_USERS = 15
  const DAILY_USERS_CHANGE = -12

  const TOTAL_VISITS = 50
  const DAILY_VISITS = 17
  const DAILY_VISITS_CHANGE = 5

  const TOTAL_LIKES = 25
  const DAILY_LIKES = 5
  const DAILY_LIKES_CHANGE = 0

  const TOTAL_COMMENTS = 35
  const DAILY_COMMENTS = 12
  const DAILY_COMMENTS_CHANGE = -2

  return (
    <Layout>
      <Row
        gutter={24}
        style={{ marginTop: 24, marginLeft: 12, marginRight: 12 }}
      >
        {/* Total users */}
        <ColStyled xs={24} sm={12}>
          <CardStyled>
            <Skeleton
              loading={true}
              active
              title={false}
              paragraph={{ rows: 3, width: ['55%', '80%', '100%'] }}
            >
              <div style={{ display: 'flex' }}>
                <MainIcon type="team" style={{ color: 'rgb(24, 144, 255)' }} />
                <NumberInfoStyled subTitle="Total users" total={TOTAL_USERS} />
              </div>

              <CardDivider />

              <CardFooter
                title="Daily users"
                value={DAILY_USERS}
                change={DAILY_USERS_CHANGE}
              />
            </Skeleton>
          </CardStyled>
        </ColStyled>

        {/* Total visits */}
        <ColStyled xs={24} sm={12}>
          <CardStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MainIcon type="environment" style={{ color: '#F73F3F' }} />
              <NumberInfoStyled subTitle="Total visits" total={TOTAL_VISITS} />
              <HelperIcon title="Total number of times sculptures have been visited" />
            </div>

            <CardDivider />

            <CardFooter
              title="Daily visits"
              value={DAILY_VISITS}
              change={DAILY_VISITS_CHANGE}
            />
          </CardStyled>
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <CardStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MainIcon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
              <NumberInfoStyled subTitle="Likes" total={TOTAL_LIKES} />
            </div>

            <CardDivider />

            <CardFooter
              title="Daily likes"
              value={DAILY_LIKES}
              change={DAILY_LIKES_CHANGE}
            />
          </CardStyled>
        </ColStyled>

        <ColStyled xs={24} sm={12}>
          <CardStyled>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MainIcon
                type="message"
                theme="twoTone"
                twoToneColor="rgb(205, 34, 255)"
              />
              <NumberInfoStyled subTitle="Comments" total={TOTAL_COMMENTS} />
            </div>

            <CardDivider />

            <CardFooter
              title="Daily comments"
              value={DAILY_COMMENTS}
              change={DAILY_COMMENTS_CHANGE}
            />
          </CardStyled>
        </ColStyled>
      </Row>
    </Layout>
  )
}
