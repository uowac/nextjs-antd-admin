import React from 'react'
import '../static/index.css'
import { Layout } from 'antd'
const { Content } = Layout

import FixedSider from './layout-components/Sider'
import MainLayout from './layout-components/Main'
import Header from './layout-components/Header'
import LogoTitle from './layout-components/LogoTitle'
import Drawer from './layout-components/Drawer'
import Menu from './layout-components/Menu'

class MyLayout extends React.Component {
  state = {
    collapsed: false,
    drawerVisible: false
  }

  componentDidMount() {
    this.setState({
      collapsed: JSON.parse(sessionStorage.getItem('collapsed')) || false
    })
  }

  toggle = () => {
    if (window.innerWidth >= 576) {
      this.setState(
        state => ({
          collapsed: !state.collapsed
        }),
        () => sessionStorage.setItem('collapsed', this.state.collapsed)
      )
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
          setCollapsed={collapsed => {
            this.setState({ collapsed })
            sessionStorage.setItem('collapsed', collapsed)
          }}
        >
          <LogoTitle />

          <Menu collapsed={collapsed} />
        </FixedSider>

        <MainLayout collapsed={collapsed}>
          <Header collapsed={collapsed} handleToggle={this.toggle} />
          <Content>{children}</Content>
        </MainLayout>

        <Drawer
          drawerVisible={drawerVisible}
          closeDrawer={() => this.setState({ drawerVisible: false })}
        >
          <LogoTitle />

          <Menu style={{ minHeight: '100vh' }} />
        </Drawer>
      </Layout>
    )
  }
}

export default MyLayout
