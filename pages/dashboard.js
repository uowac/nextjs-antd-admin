import { useEffect } from 'react'
import { Row, Col, Card, Statistic } from 'antd'
import Layout from '../components/Layout'

export default () => {
  return (
    <Layout>
      <Card style={{ margin: 24 }}>
        <Statistic title="Hello" value="$500" />
      </Card>
      <Card style={{ margin: 24 }}>
        <Statistic title="Hello" value="$500" />
      </Card>
      <Card style={{ margin: 24 }}>
        <Statistic title="Hello" value="$500" />
      </Card>
      <Card style={{ margin: 24 }}>
        <Statistic title="Hello" value="$500" />
      </Card>
    </Layout>
  )
}
