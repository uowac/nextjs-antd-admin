/**
 * Description: Component for Sculpture create page
 * Author: Hieu Chu
 */

import { useState, useEffect } from 'react'
import { Row, Button, Form, message } from 'antd'
import { ColStyled, CardStyled, FormCol, CustomFormItem } from '../style'
import { FlyToInterpolator } from 'react-map-gl'
import Map from '../../map-components'
import TextFields from './CreateFormTextFields'
import api from '../../../api'
import Loading from '../../Loading'
import Error from 'next/error'

const SculptureCreate = ({
  form,
  form: { getFieldDecorator, setFieldsValue },
  setStep,
  setSculpture
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

  const [makerList, setMakerList] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const addMaker = maker => {
    setMakerList([...makerList, maker])
    setFieldsValue({
      primaryMakerId: maker.id
    })
  }

  useEffect(() => {
    const fetchMakerList = async () => {
      try {
        const data = (await api.get('/maker/')).data
        console.log(data)
        setMakerList(data)
      } catch (e) {
        const { statusCode, message } = e.response.data
        setError({
          statusCode,
          message
        })
      }
      setLoading(false)
    }
    fetchMakerList()
  }, [])

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
            delete values[key]
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
          const _result = (await api.post('/sculpture', values)).data
          setSubmitting(false)
          setSculpture({ ...values })
          setStep(s => s + 1)
        } catch (e) {
          setSubmitting(false)
          message.error(e.response.data.message)
        }
      }
    })
  }

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

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
                makerList={makerList}
                addMaker={addMaker}
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
                </CustomFormItem>
              </FormCol>
            </ColStyled>
          </Form>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default Form.create({
  name: 'sculpture_create_form'
})(SculptureCreate)
