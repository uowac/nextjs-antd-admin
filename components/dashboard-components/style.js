import { Card, Tooltip, Icon, Divider, Col } from 'antd'
import { NumberInfo } from 'ant-design-pro'
import styled from 'styled-components'

export const CardStyled = props => (
  <Card bodyStyle={{ padding: '20px 24px 8px' }} bordered={false} {...props} />
)

export const NumberInfoStyled = props => (
  <NumberInfo
    {...props}
    total={<span style={{ fontSize: 30 }}>{props.total.toLocaleString()}</span>}
    style={{ display: 'inline-block' }}
  />
)

export const HelperIcon = props => (
  <div style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
    <Tooltip {...props} placement="topLeft" arrowPointAtCenter={true}>
      <Icon
        type="info-circle"
        style={{ verticalAlign: -3, cursor: 'pointer' }}
      />
    </Tooltip>
  </div>
)

export const MainIcon = props => (
  <div style={{ marginRight: 16 }}>
    <Icon {...props} style={{ ...props.style, fontSize: 54 }} />
  </div>
)

export const CardFooter = props => {
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

export const ColStyled = styled(Col)`
  padding-bottom: 12px;
`

export const CardDivider = styled(Divider)`
  margin-top: 12px;
  margin-bottom: 9px;
`

export const BarContainer = styled.div`
  margin-top: 10px;
  margin-bottom: -10px;
`
