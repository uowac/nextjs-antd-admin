import { useState, useEffect } from 'react'
import { Row, Input, Button, Form } from 'antd'
import { ColStyled, CardStyled, FormCol, CustomFormItem } from '../style'
import { FlyToInterpolator } from 'react-map-gl'
import Map from '../../map-components'
import TextFields from './CreateFormTextFields'

const SculptureCreate = ({
  form,
  form: { getFieldDecorator, setFieldsValue }
}) => {
  const [view, setView] = useState({
    latitude: -34.40581053569814,
    longitude: 150.87842788963476,
    zoom: 15,
    pitch: 50
  })

  const initialData = {
    markerLat: -34.40581053569814,
    markerLng: 150.87842788963476
  }

  const [marker, setMarker] = useState({
    ...initialData
  })

  const flyTo = (latitude, longitude) => {
    setView({
      ...view,
      latitude,
      longitude,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 1500,
      zoom: 15
    })

    setMarker({
      markerLat: latitude,
      markerLng: longitude
    })
  }

  const showLocationOnMap = () => {
    form.validateFields(['latitude', 'longitude'], (errors, values) => {
      console.log('hey')
      if (!errors) {
        const { latitude, longitude } = values
        flyTo(+latitude, +longitude)
      }
    })
  }

  const handleSubmit = e => {
    console.log(1234)
    e.preventDefault()
    form.validateFields((err, values) => {
      console.log(err)
      console.log(values)
      if (!err) {
        // remember to convert lat and long to numeric type
        console.log('Received values of form: ', values)
      }
    })
  }

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="Create new sculpture">
          <Form onSubmit={handleSubmit} autoComplete="off">
            <ColStyled xs={24} md={12}>
              {/* long repeated list of text fields */}
              <TextFields
                getFieldDecorator={getFieldDecorator}
                initialData={initialData}
              />
              <FormCol xs={24}>
                <Button onClick={showLocationOnMap}>Show on map</Button>
              </FormCol>
            </ColStyled>

            <ColStyled
              xs={24}
              md={12}
              style={{
                height: 500,
                marginTop: 10
              }}
            >
              <Map
                view={view}
                marker={marker}
                setView={setView}
                setMarker={({ markerLat, markerLng }) => {
                  setMarker({ markerLat, markerLng })
                  setFieldsValue({
                    latitude: String(markerLat),
                    longitude: String(markerLng)
                  })
                }}
              />
            </ColStyled>

            <ColStyled xs={24}>
              <FormCol xs={24}>
                <CustomFormItem style={{ marginBottom: 0, marginTop: 8 }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </CustomFormItem>
              </FormCol>
            </ColStyled>
          </Form>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureCreate
