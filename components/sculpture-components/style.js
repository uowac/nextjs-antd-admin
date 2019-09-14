import styled from 'styled-components'
import { Card, Col, Icon, Form, Typography, Empty } from 'antd'

const { Text } = Typography

export const CardStyled = props => (
  <Card bodyStyle={{ padding: '20px 24px 20px' }} bordered={false} {...props} />
)

export const ColStyled = styled(Col)`
  padding-bottom: 12px;
`

export const DescriptionIcon = styled(Icon)`
  font-size: 20px;
`

export const ShadowCard = styled(CardStyled)`
  box-shadow: rgba(0, 0, 0, 0.06) 0px 9px 24px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(242, 242, 242);
  border-radius: 3px;
  transition: all 150ms ease-in-out 0s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 24px;
    cursor: pointer;
    transition: all 150ms ease-in-out 0s;
  }
`

export const CustomFormItem = styled(Form.Item)`
  margin-bottom: 8px;

  &.ant-form-item-with-help {
    margin-bottom: 5px;
  }
`

export const FormCol = styled(Col)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`

export const Subtitle = styled(Text)`
  display: block;
  margin-bottom: 12px;
`

export const EmptyImage = styled(Empty)`
  height: 230px;
  margin: 0;
  border-bottom: 0.3px solid rgba(0, 0, 0, 0.25);

  & .ant-empty-image {
    margin-top: 220px;
  }
`
