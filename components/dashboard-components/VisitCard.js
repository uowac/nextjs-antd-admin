import {
  CardStyled,
  MainIcon,
  CardDivider,
  NumberInfoStyled,
  CardFooter,
  HelperIcon,
  BarContainer
} from './style'

import dynamic from 'next/dynamic'
import { Tooltip, Icon, Menu, Dropdown, DatePicker } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker

const MiniArea = dynamic(
  import('ant-design-pro/lib/Charts').then(mod => mod.MiniArea),
  { ssr: false }
)

export default ({
  TOTAL_VISITS,
  DAILY_VISITS,
  DAILY_VISITS_CHANGE,
  VISIT_DATA,
  startDate,
  endDate
}) => {
  const generateMenu = (startDate, endDate) => (
    <div className="ant-dropdown-menu date-menu">
      <RangePicker
        defaultValue={[startDate, endDate]}
        format="MMM D YYYY"
        separator="-"
        size="large"
        allowClear={false}
        onChange={dates => {
          console.log(dates)
        }}
      />
    </div>
  )

  const CustomDropdown = () => (
    <div style={{ marginLeft: 'auto', alignSelf: 'flex-start' }}>
      <Dropdown overlay={generateMenu(startDate, endDate)} trigger={['click']}>
        <Icon type="more" />
      </Dropdown>
    </div>
  )

  return (
    <CardStyled>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <MainIcon type="environment" style={{ color: '#F73F3F' }} />
        <NumberInfoStyled subTitle="Total visits" total={TOTAL_VISITS} />
        <CustomDropdown />
      </div>

      <BarContainer>
        <MiniArea
          line
          data={VISIT_DATA}
          borderColor="#F73F3F"
          color="#fff2f0"
        />
      </BarContainer>

      <CardDivider />

      <CardFooter
        title="Daily visits"
        value={DAILY_VISITS}
        change={DAILY_VISITS_CHANGE}
      />
    </CardStyled>
  )
}
