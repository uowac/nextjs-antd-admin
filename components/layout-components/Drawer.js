import { Drawer } from 'antd'
import styled from 'styled-components'

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    overflow: hidden !important;
  }
`
export default ({ drawerVisible, closeDrawer, children }) => (
  <StyledDrawer
    placement="left"
    closable={false}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
      margin: 0,
      padding: 0
    }}
  >
    {children}
  </StyledDrawer>
)
