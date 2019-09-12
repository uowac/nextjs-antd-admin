import { useRouter } from 'next/router'
import { Row, Carousel } from 'antd'
import { ColStyled, CardStyled } from './style'

const SculptureDetail = () => {
  const router = useRouter()

  return (
    <Row gutter={16}>
      <ColStyled xs={24} md={12}>
        <CardStyled title="Sculpture Detail">
          <Carousel
            draggable
            style={{
              width: '100%'
            }}
          >
            <div>
              <img src="/static/img1.jpg" />
            </div>
            <div>
              <img src="/static/img2.jpg" />
            </div>
          </Carousel>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureDetail
