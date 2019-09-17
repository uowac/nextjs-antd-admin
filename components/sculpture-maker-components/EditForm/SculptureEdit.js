import { useState, useEffect } from 'react'
import { Button, Form, message } from 'antd'
import { ColStyled, FormCol, CustomFormItem } from '../style'
import { FlyToInterpolator } from 'react-map-gl'
import Map from '../../map-components'
import EditFormTextFields from './EditFormTextFields'
import api from '../../../api'
import Router from 'next/router'

const SculptureEdit = ({
  form,
  form: { getFieldDecorator, setFieldsValue, getFieldValue, resetFields },
  defaultPosition,
  initialData,
  initialData: { latitude, longitude },
  makerList,
  setMakerList
}) => {
  const [view, setView] = useState({
    latitude: latitude ? latitude : defaultPosition[0],
    longitude: longitude ? longitude : defaultPosition[1],
    zoom: 15,
    pitch: 50
  })

  const [marker, setMarker] = useState({
    markerLat: latitude ? latitude : defaultPosition[0],
    markerLng: longitude ? longitude : defaultPosition[1]
  })

  const [submitting, setSubmitting] = useState(false)

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
      if (!errors) {
        const { latitude, longitude } = values
        flyTo(+latitude, +longitude)
      }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        // remember to convert lat and long to numeric type
        console.log('Received values of form: ', values)
        for (let key in values) {
          if (!values[key]) {
            values[key] = null
          }
        }

        if (values.latitude) {
          values.latitude = Number(values.latitude)
        }

        if (values.longitude) {
          values.longitude = Number(values.longitude)
        }

        console.log('after', values)

        setSubmitting(true)
        try {
          const _result = (await api.patch('/sculpture', values)).data
          message.success('Updated sculpture details successfully!', 2)
          setSubmitting(false)
          setTimeout(
            () => Router.push(`/sculptures/id/${values.accessionId}`),
            550
          )
        } catch (e) {
          setSubmitting(false)
          message.error(e.response.data.message)
        }
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit} autoComplete="off">
      <ColStyled xs={24} md={12}>
        {/* long repeated list of text fields */}
        <EditFormTextFields
          getFieldDecorator={getFieldDecorator}
          setFieldsValue={setFieldsValue}
          getFieldValue={getFieldValue}
          initialData={initialData}
          makerList={makerList}
          setMakerList={setMakerList}
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
            <Button type="primary" htmlType="submit" loading={submitting}>
              Submit
            </Button>
            <Button
              type="default"
              style={{
                marginLeft: 5
              }}
              onClick={() => {
                resetFields()
                const flyLat = latitude ? latitude : defaultPosition[0]
                const flyLng = longitude ? longitude : defaultPosition[1]
                flyTo(flyLat, flyLng)
              }}
            >
              Reset
            </Button>
          </CustomFormItem>
        </FormCol>
      </ColStyled>
    </Form>
  )
}

export default Form.create({
  name: 'sculpture_edit_form'
})(SculptureEdit)
