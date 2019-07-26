import { Layout } from 'antd'
import styled, { css } from 'styled-components'

const MainLayout = styled(({ collapsed: _, ...props }) => (
  <Layout {...props} />
))`
  transition: 0.2s all;
  margin-left: 256px;
  ${({ collapsed }) =>
    collapsed &&
    css`
      margin-left: 80px;
    `};

  @media (max-width: 575.98px) {
    margin-left: 0;
  }
`

export default ({ children, collapsed }) => (
  <MainLayout collapsed={collapsed}>{children}</MainLayout>
)
