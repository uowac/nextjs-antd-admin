import styled from 'styled-components'
import antd_logo from '../../public/antd-logo'

const Logo = styled.img`
  display: inline-block;
  height: 32px;
  vertical-align: middle;
`

const Title = styled.div`
  display: inline-block;
  color: white;
  font-weight: 600;
  font-size: 20px;
  margin-left: 12px;
  font-family: 'Arial';
  vertical-align: middle;
`

const TitleWrapper = styled.div`
  position: relative;
  height: 64px;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  transition: all 0.3s;
  background: #001529;
`

export default () => (
  <TitleWrapper>
    <a>
      <Logo src={antd_logo} />
      <Title>UOW Sculptures</Title>
    </a>
  </TitleWrapper>
)
