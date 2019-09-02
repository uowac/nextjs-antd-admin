import { Input, Icon } from 'antd'
const { TextArea } = Input
import { FormCol, CustomFormItem } from '../style'
import { validateLatitude, validateLongitude } from '../../shared/utils'

export default ({ getFieldDecorator }) => {
  return (
    <>
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
                <Icon type="trophy" style={{ color: 'rgba(0,0,0,.25)' }} />
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
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
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
                <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
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
        <CustomFormItem
          label="Latitude"
          hasFeedback
          style={{ paddingRight: 8 }}
        >
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
                <Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Latitude"
            />
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol xs={24} sm={12}>
        <CustomFormItem
          label="Longitude"
          hasFeedback
          style={{ paddingLeft: 8 }}
        >
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
                <Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Longitude"
            />
          )}
        </CustomFormItem>
      </FormCol>
    </>
  )
}
