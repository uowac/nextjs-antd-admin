import Layout from '../components/Layout'
import { Card, DatePicker } from 'antd'
// import { Result } from 'ant-design-pro'

export default () => (
  <Layout>
    <div>Nav2</div>
    {/* <Result type="success" /> */}
    <Card title="123456">
      <div>Hello World</div>
    </Card>
    <DatePicker />
  </Layout>
)
