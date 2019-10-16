/**
 * Description: Component for primary maker create page
 * Author: Hieu Chu
 */

import { useState } from 'react'
import { Input, Form, Button, Modal, message } from 'antd'
import { CustomFormItem } from '../style'
import api from '../../../api'

const MakerCreate = ({
  form: { getFieldDecorator, validateFields, resetFields },
  visible,
  handleCancel,
  addMaker
}) => {
  const [submitting, setSubmitting] = useState(false)

  const handleOk = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        for (let key in values) {
          if (!values[key]) {
            delete values[key]
          }
        }

        if (values.birthYear) {
          values.birthYear = Number(values.birthYear)
        }
        if (values.deathYear) {
          values.deathYear = Number(values.deathYear)
        }

        setSubmitting(true)
        try {
          const result = (await api.post('/maker', values)).data
          addMaker(result)
          setSubmitting(false)
          handleCancel()
          resetFields()
          message.success('Created new maker succesfully!', 2)
        } catch (e) {
          setSubmitting(false)
          message.error(e.response.data.message)
        }
      }
    })
  }

  return (
    <Modal
      visible={visible}
      title="Add new maker"
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={submitting}
          onClick={handleOk}
        >
          Submit
        </Button>
      ]}
    >
      <Form autoComplete="off">
        <CustomFormItem label="First name" hasFeedback>
          {getFieldDecorator('firstName', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please fill in the first name!'
              }
            ]
          })(<Input type="text" placeholder="First name" />)}
        </CustomFormItem>

        <CustomFormItem label="Last name" hasFeedback>
          {getFieldDecorator('lastName', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please fill in the last name!'
              }
            ]
          })(<Input type="text" placeholder="Last name" />)}
        </CustomFormItem>

        <CustomFormItem label="Nationality" hasFeedback>
          {getFieldDecorator('nationality')(
            <Input type="text" placeholder="Nationality" />
          )}
        </CustomFormItem>

        <CustomFormItem label="Born" hasFeedback>
          {getFieldDecorator('birthYear', {
            rules: [
              {
                pattern: '^[0-9]{4}$',
                message: 'Please fill in a valid year!'
              }
            ]
          })(<Input type="text" placeholder="Born" />)}
        </CustomFormItem>

        <CustomFormItem label="Passed away" hasFeedback>
          {getFieldDecorator('deathYear', {
            rules: [
              {
                pattern: '^[0-9]{4}$',
                message: 'Please fill in a valid year!'
              }
            ]
          })(<Input type="text" placeholder="Passed away" />)}
        </CustomFormItem>

        <CustomFormItem label="Website" hasFeedback>
          {getFieldDecorator('wikiUrl', {
            rules: [
              {
                type: 'url',
                message: 'Please fill in a valid URL!'
              }
            ]
          })(<Input type="text" placeholder="Website" />)}
        </CustomFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  name: 'maker_create_form'
})(MakerCreate)
