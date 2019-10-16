/**
 * Description: Comment statistics card, including total comments and trend graph
 * Author: Hieu Chu
 */

import {
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
  TOTAL_COMMENTS,
  DAILY_COMMENTS,
  DAILY_COMMENTS_CHANGE,
  COMMENT_DATA
}) => {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MainIcon
          type="message"
          theme="twoTone"
          twoToneColor="rgb(205, 34, 255)"
        />
        <NumberInfoStyled subTitle="Comments" total={TOTAL_COMMENTS} />
      </div>

      <BarContainer>
        <MiniArea
          line
          data={COMMENT_DATA}
          borderColor="rgb(205, 34, 255)"
          color="#feedff"
        />
      </BarContainer>

      <CardDivider />

      <CardFooter
        title="Daily comments"
        value={DAILY_COMMENTS}
        change={DAILY_COMMENTS_CHANGE}
      />
    </>
  )
}
