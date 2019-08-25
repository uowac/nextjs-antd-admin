import dynamic from 'next/dynamic'
const Pie = dynamic(import('ant-design-pro/lib/Charts').then(mod => mod.Pie), {
  ssr: false
})
import { CardStyled } from './style'

const userPieData = [
  { x: 'Anonymous', y: 15 },
  { x: 'Email', y: 20 },
  { x: 'Google', y: 25 },
  { x: 'Facebook', y: 12 }
]

const total = userPieData
  .reduce((total, cur) => total + cur.y, 0)
  .toLocaleString()

export default () => (
  <CardStyled title="Proportion of Users">
    {/* <Exception type="404" /> */}
    {/* <WaterWave height={161} title="补贴资金剩余" percent={34} /> */}
    <Pie
      hasLegend
      title="Total Users"
      subTitle="Total Users"
      total={() => total}
      data={userPieData}
      valueFormat={val => val.toLocaleString()}
      height={294}
      colors={['#FBDB5A', '#A97BE9', '#EA4335', '#1890FF']}
    />
  </CardStyled>
)
