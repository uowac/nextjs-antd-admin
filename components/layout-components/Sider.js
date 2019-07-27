import { Layout } from 'antd'
import styled from 'styled-components'

const { Sider } = Layout

const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

  @media (max-width: 575.98px) {
    display: none;
  }
`

export default ({ collapsed, setCollapsed, children }) => (
  <FixedSider
    trigger={null}
    width={256}
    collapsible
    collapsed={collapsed}
    breakpoint="lg"
    // onBreakpoint={collapsed => setCollapsed(collapsed)}
  >
    {children}
  </FixedSider>
)
