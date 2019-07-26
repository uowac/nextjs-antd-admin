import React from 'react'
import '../public/index.css'
import { Layout, Menu } from 'antd'
const { Content } = Layout

import FixedSider from './layout-components/Sider'
import MainLayout from './layout-components/Main'
import Header from './layout-components/Header'
import LogoTitle from './layout-components/LogoTitle'
import Drawer from './layout-components/Drawer'
import menuItems from './layout-components/menu-items'

class MyLayout extends React.Component {
  state = {
    collapsed: false,
    drawerVisible: false
  }

  toggle = () => {
    if (window.innerWidth >= 576) {
      this.setState(state => ({
        collapsed: !state.collapsed
      }))
    } else {
      this.setState(state => ({
        drawerVisible: !state.drawerVisible
      }))
    }
  }

  render() {
    const { collapsed, drawerVisible } = this.state
    const { children } = this.props

    return (
      <Layout
        style={{
          minHeight: '100vh'
        }}
      >
        <FixedSider
          collapsed={collapsed}
          setCollapsed={collapsed => this.setState({ collapsed })}
        >
          <LogoTitle />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ padding: '16px 0' }}
          >
            {menuItems}
          </Menu>
        </FixedSider>

        <MainLayout collapsed={collapsed}>
          <Header collapsed={collapsed} handleToggle={this.toggle} />
          <Content
            style={{
              margin: 24,
              padding: 24,
              background: '#fff'
            }}
          >
            {children}
          </Content>
        </MainLayout>

        <Drawer
          drawerVisible={drawerVisible}
          closeDrawer={() => this.setState({ drawerVisible: false })}
        >
          <LogoTitle />

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{
              minHeight: '100vh',
              padding: '16px 0'
            }}
          >
            {menuItems}
          </Menu>
        </Drawer>
      </Layout>
    )
  }
}

export default MyLayout
