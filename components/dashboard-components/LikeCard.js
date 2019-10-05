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
  TOTAL_LIKES,
  DAILY_LIKES,
  DAILY_LIKES_CHANGE,
  LIKE_DATA
}) => (
  <>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MainIcon type="heart" theme="twoTone" twoToneColor="#eb2f96" />
      <NumberInfoStyled subTitle="Likes" total={TOTAL_LIKES} />
    </div>

    <BarContainer>
      <MiniArea line data={LIKE_DATA} borderColor="#eb2f96" color="#fff0f6" />
    </BarContainer>

    <CardDivider />

    <CardFooter
      title="Daily likes"
      value={DAILY_LIKES}
      change={DAILY_LIKES_CHANGE}
    />
  </>
)
