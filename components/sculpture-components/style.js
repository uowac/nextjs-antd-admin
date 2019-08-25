import styled from 'styled-components'
import { Card, Col, Icon } from 'antd'

export const CardStyled = props => (
  <Card bodyStyle={{ padding: '20px 24px 20px' }} bordered={false} {...props} />
)

export const ColStyled = styled(Col)`
  padding-bottom: 12px;
`

export const DescriptionIcon = styled(Icon)`
  font-size: 20px;
`
