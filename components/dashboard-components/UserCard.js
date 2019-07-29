import {
  CardStyled,
  MainIcon,
  CardDivider,
  NumberInfoStyled,
  CardFooter,
  BarContainer
} from '../shared'
import dynamic from 'next/dynamic'
const MiniBar = dynamic(
  import('ant-design-pro/lib/Charts').then(mod => mod.MiniBar),
  { ssr: false }
)
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
    <CardStyled>
      {/* <Skeleton
      loading={true}
      active
      title={false}
      paragraph={{ rows: 3, width: ['55%', '80%', '100%'] }}
    > */}
      <div style={{ display: 'flex' }}>
        <MainIcon type="team" style={{ color: 'rgb(24, 144, 255)' }} />
        <NumberInfoStyled subTitle="Total users" total={TOTAL_USERS} />
      </div>

      <BarContainer>
        {process.browser && <MiniArea line data={USER_DATA} />}
      </BarContainer>

      <CardDivider />

      <CardFooter
        title="Daily users"
        value={DAILY_USERS}
        change={DAILY_USERS_CHANGE}
      />
      {/* </Skeleton> */}
    </CardStyled>
  )
}
