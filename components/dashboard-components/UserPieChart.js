/**
 * Description: User proportion pie chart
 * Author: Hieu Chu
 */

import dynamic from 'next/dynamic'
const Pie = dynamic(import('ant-design-pro/lib/Charts').then(mod => mod.Pie), {
  ssr: false
})

// import { Pie } from 'ant-design-pro/lib/Charts'
import { CardStyled } from './style'

export default ({ users }) => {
  const userPieData = [
    { x: 'Email', y: 0 },
    { x: 'Google', y: 0 },
    { x: 'Facebook', y: 0 }
  ]

  users.forEach(x => {
    if (x.userId.includes('auth0')) {
      userPieData.find(elem => elem.x === 'Email').y++
    } else if (x.userId.includes('google')) {
      userPieData.find(elem => elem.x === 'Google').y++
    } else {
      userPieData.find(elem => elem.x === 'Facebook').y++
    }
  })

  return (
    <CardStyled title="Proportion of Users">
      <Pie
        hasLegend
        title="Total Users"
        subTitle="Total Users"
        total={() => users.length}
        data={userPieData}
        valueFormat={val => val.toLocaleString()}
        height={294}
        colors={['#A97BE9', '#EA4335', '#1890FF']}
      />
    </CardStyled>
  )
}
