/**
 * Description: Loading indicator component
 * Author: Hieu Chu
 */

import { Spin } from 'antd'

const Loading = () => (
  <div
    style={{
      height: 350,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Spin size="large" />
  </div>
)

export default Loading
