import { useState, useEffect } from 'react'
import { Row, Card, Typography, Input, Button, Icon, Form } from 'antd'
const { Text } = Typography
const { Meta } = Card
const { Search } = Input
import Link from 'next/link'
import {
  ColStyled,
  CardStyled,
  DescriptionIcon,
  ShadowCard,
  FormCol,
  CustomFormItem
} from './style'
import styled, { css } from 'styled-components'
import TextArea from 'antd/lib/input/TextArea'

const SculptureCreate = ({ form, form: { getFieldDecorator } }) => {
  const handleSubmit = e => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  const validateLatitude = (rule, value, callback) => {
    if (!value || !value.trim()) return callback()
    if (isNaN(value)) {
      return callback('Please fill in a valid latitude value!')
    } else {
      if (parseFloat(value) <= -90 || parseFloat(value) >= 90) {
        return callback('Please fill in a valid latitude value!')
      }
    }
    return callback()
  }

  const validateLongitude = (rule, value, callback) => {
    if (!value || !value.trim()) return callback()
    if (isNaN(value)) {
      return callback('Please fill in a valid longitude value!')
    } else {
      if (parseFloat(value) <= -180 || parseFloat(value) >= 180) {
        return callback('Please fill in a valid longitude value!')
      }
    }
    return callback()
  }

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="Create new sculpture">
          <div style={{ maxWidth: 600 }}>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <FormCol>
                <CustomFormItem label="Sculpture title" hasFeedback>
                  {getFieldDecorator('title', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the sculpture title!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="trophy"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Sculpture title"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol>
                <CustomFormItem label="Primary maker" hasFeedback>
                  {getFieldDecorator('maker', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the primary maker!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Primary maker"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol>
                <CustomFormItem label="Created date" hasFeedback>
                  {getFieldDecorator('createdDate', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the created date!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="calendar"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Created date"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol>
                <CustomFormItem label="Material" hasFeedback>
                  {getFieldDecorator('material', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the material!'
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="code-sandbox"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Material"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol>
                <CustomFormItem label="Credit line" hasFeedback>
                  {getFieldDecorator('creditLine', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the credit line!'
                      }
                    ]
                  })(
                    <TextArea
                      placeholder="Credit line"
                      autosize={{ minRows: 3, maxRows: 5 }}
                      style={{ marginTop: 5 }}
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol>
                <CustomFormItem label="Location details" hasFeedback>
                  {getFieldDecorator('locationDetails', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the location details!'
                      }
                    ]
                  })(
                    <TextArea
                      placeholder="Location details"
                      autosize={{ minRows: 3, maxRows: 5 }}
                      style={{ marginTop: 5 }}
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol xs={24} sm={12}>
                <CustomFormItem label="Latitude" hasFeedback>
                  {getFieldDecorator('latitude', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the latitude!'
                      },
                      {
                        validator: validateLatitude
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="compass"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Latitude"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol xs={24} sm={12}>
                <CustomFormItem label="Longitude" hasFeedback>
                  {getFieldDecorator('longitude', {
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: 'Please fill in the longitude'
                      },
                      {
                        validator: validateLongitude
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="compass"
                          style={{ color: 'rgba(0,0,0,.25)' }}
                        />
                      }
                      type="text"
                      placeholder="Longitude"
                    />
                  )}
                </CustomFormItem>
              </FormCol>

              <FormCol xs={24} sm={12}>
                <CustomFormItem style={{ marginBottom: 0, marginTop: 8 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Submit
                  </Button>
                </CustomFormItem>
              </FormCol>
            </Form>
          </div>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureCreate
