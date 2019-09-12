import { Menu, Icon } from 'antd'
import { useRouter } from 'next/router'

const keys = ['/', '/sculptures']

const menu = [
  <Menu.Item key={keys[0]}>
    <Icon type="dashboard" />
    <span>Dashboard</span>
  </Menu.Item>,
  <Menu.Item key={keys[1]}>
    <Icon type="table" />
    <span>Sculptures</span>
  </Menu.Item>
]

export default ({ style }) => {
  const router = useRouter()
  const currentPath = router.route
  let selectedKeys = []

  for (let i = keys.length - 1; i >= 0; i--) {
    if (currentPath.includes(keys[i])) {
      selectedKeys = [keys[i]]
      break
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => router.push(key)}
    >
      {menu}
    </Menu>
  )
}
