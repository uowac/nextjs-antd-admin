import { Icon, Layout, Dropdown, Menu, Button } from 'antd'
const { Header } = Layout
import styled from 'styled-components'

const HeaderBlock = styled.div`
  display: inline-block;
  padding: 0 12px;
  height: 100%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`

const menu = (
  <Menu>
    <Menu.Item key="1">
      <Icon type="setting" />
      Change password
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Icon type="logout" />
      Logout
    </Menu.Item>
  </Menu>
)

export default ({ collapsed, handleToggle }) => (
  <Header
    style={{
      background: '#fff',
      padding: 0,
      boxShadow: '0 1px 4px rgba(0,21,41,.08)',
      display: 'flex'
    }}
  >
    <Icon
      className="trigger"
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={handleToggle}
    />

    <div
      style={{
        marginLeft: 'auto'
      }}
    >
      <Dropdown overlay={menu} placement="bottomRight">
        <HeaderBlock>
          <div>
            <Icon
              type="user"
              style={{ fontSize: 16, marginRight: 8 }}
              title="User"
            />
            <span>Admin</span>
          </div>
        </HeaderBlock>
      </Dropdown>
    </div>
  </Header>
)
