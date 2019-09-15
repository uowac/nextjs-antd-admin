import { useState } from 'react'
import { Input, Form, Button, Modal, message } from 'antd'
import { CustomFormItem } from '../style'
import api from '../../../api'

const MakerEdit = ({
  form: { getFieldDecorator, validateFields, resetFields },
  visible,
  handleCancel,
  getCurrentMaker,
  editMaker
}) => {
  const [submitting, setSubmitting] = useState(false)

  const {
    firstName,
    lastName,
    nationality,
    birthYear,
    deathYear,
    wikiUrl,
    id
  } = getCurrentMaker()

  const handleOk = e => {
    e.preventDefault()
    validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of maker form: ', values)
        for (let key in values) {
          if (!values[key]) {
            values[key] = null
          }
        }

        if (values.birthYear) {
          values.birthYear = Number(values.birthYear)
        }
        if (values.deathYear) {
          values.deathYear = Number(values.deathYear)
        }

        values.id = id
        console.log('after maker', values)

        setSubmitting(true)
        try {
          const _result = (await api.patch('/maker', values)).data
          setSubmitting(false)
          editMaker(values)
          handleCancel()
          message.success('Updated maker details successfully!', 2)
        } catch (e) {
          setSubmitting(false)
          console.log(e.response.data.message)
        }
      }
    })
  }

  return (
    <Modal
      visible={visible}
      title="Edit maker details"
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="back" onClick={() => resetFields()}>
          Reset
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
            ],
            initialValue: firstName
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
            ],
            initialValue: lastName
          })(<Input type="text" placeholder="Last name" />)}
        </CustomFormItem>

        <CustomFormItem label="Nationality" hasFeedback>
          {getFieldDecorator('nationality', {
            initialValue: nationality
          })(<Input type="text" placeholder="Nationality" />)}
        </CustomFormItem>

        <CustomFormItem label="Birth year" hasFeedback>
          {getFieldDecorator('birthYear', {
            rules: [
              {
                pattern: '^[0-9]{4}$',
                message: 'Please fill in a valid birth year!'
              }
            ],
            initialValue: birthYear ? String(birthYear) : ''
          })(<Input type="text" placeholder="Birth year" />)}
        </CustomFormItem>

        <CustomFormItem label="Death year" hasFeedback>
          {getFieldDecorator('deathYear', {
            rules: [
              {
                pattern: '^[0-9]{4}$',
                message: 'Please fill in a valid death year!'
              }
            ],
            initialValue: deathYear ? String(deathYear) : ''
          })(<Input type="text" placeholder="Death year" />)}
        </CustomFormItem>

        <CustomFormItem label="URL" hasFeedback>
          {getFieldDecorator('wikiUrl', {
            rules: [
              {
                type: 'url',
                message: 'Please fill in a valid URL!'
              }
            ],
            initialValue: wikiUrl
          })(<Input type="text" placeholder="URL" />)}
        </CustomFormItem>
      </Form>
    </Modal>
  )
}

export default Form.create({
  name: 'maker_edit_form'
})(MakerEdit)
