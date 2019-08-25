import { Menu, Icon } from 'antd'
import { useRouter } from 'next/router'

const menu = [
  <Menu.Item key="/">
    <Icon type="dashboard" />
    <span>Dashboard</span>
  </Menu.Item>,
  <Menu.Item key="/sculptures">
    <Icon type="table" />
    <span>Sculptures</span>
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
