import {
  CardStyled,
  MainIcon,
  CardDivider,
  NumberInfoStyled,
  CardFooter,
  BarContainer
} from './style'

import dynamic from 'next/dynamic'
const MiniArea = dynamic(
  import('ant-design-pro/lib/Charts').then(mod => mod.MiniArea),
  { ssr: false }
)

export default ({
  TOTAL_USERS,
  DAILY_USERS,
  DAILY_USERS_CHANGE,
  USER_DATA
}) => {
  return (
    <>
      <div style={{ display: 'flex' }}>
        <MainIcon type="team" style={{ color: 'rgb(24, 144, 255)' }} />
        <NumberInfoStyled subTitle="Total users" total={TOTAL_USERS} />
      </div>

      <BarContainer>
        <MiniArea line data={USER_DATA} />
      </BarContainer>

      <CardDivider />

      <CardFooter
        title="Daily users"
        value={DAILY_USERS}
        change={DAILY_USERS_CHANGE}
      />
    </>
  )
}
