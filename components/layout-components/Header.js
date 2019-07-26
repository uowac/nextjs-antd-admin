import { Icon, Layout } from 'antd'
const { Header } = Layout

export default ({ collapsed, handleToggle }) => (
  <Header
    style={{
      background: '#fff',
      padding: 0,
      boxShadow: '2px 0 6px rgba(0, 21, 41, 0.1)'
    }}
  >
    <Icon
      className="trigger"
      type={collapsed ? 'menu-unfold' : 'menu-fold'}
      onClick={handleToggle}
    />
    <div style={{ display: 'inline-block' }}>123</div>
  </Header>
)
