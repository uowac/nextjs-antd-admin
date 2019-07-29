import { Menu, Icon } from 'antd'
import { useRouter } from 'next/router'

const menu = [
  <Menu.Item key="/">
    <Icon type="dashboard" />
    <span>Dashboard</span>
  </Menu.Item>,
  <Menu.Item key="/nav2">
    <Icon type="video-camera" />
    <span>nav 2</span>
  </Menu.Item>,
  <Menu.Item key="nav3">
    <Icon type="upload" />
    <span>nav 3</span>
  </Menu.Item>
]

export default ({ style }) => {
  const router = useRouter()
  const currentPath = router.route

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[currentPath]}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => router.push(key)}
    >
      {menu}
    </Menu>
  )
}
