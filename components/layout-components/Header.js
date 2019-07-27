import { Icon, Layout, Dropdown, Menu } from 'antd'
const { Header } = Layout
import styled from 'styled-components'
import antd_logo from '../../public/antd-logo'
import { Logo } from './LogoTitle'
import Link from 'next/link'

const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
  cursor: pointer;
`

const MobileLogo = styled(Logo)`
  vertical-align: -10px;
`

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
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
    <Link href="/dashboard">
      <StyledImageBlock>
        <MobileLogo src={antd_logo} alt="logo" />
      </StyledImageBlock>
    </Link>

    <TriggerBlock>
      <Icon
        className="trigger"
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={handleToggle}
        style={{
          fontSize: 20,
          verticalAlign: 'middle'
        }}
      />
    </TriggerBlock>

    <div
      style={{
        marginLeft: 'auto'
      }}
    >
      <Dropdown overlay={menu} placement="bottomRight">
        <HeaderBlock>
          <Icon
            type="user"
            style={{ fontSize: 16, marginRight: 8 }}
            title="User"
          />
          <span>Admin</span>
        </HeaderBlock>
      </Dropdown>
    </div>
  </Header>
)
