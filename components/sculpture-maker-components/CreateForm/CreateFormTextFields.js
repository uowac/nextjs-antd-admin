import { useState } from 'react'
import { Input, Icon, Select, Modal, Divider, Button } from 'antd'
const { TextArea } = Input
import { FormCol, CustomFormItem } from '../style'
import { validateLatitude, validateLongitude } from '../../shared/utils'
import MakerCreate from './MakerCreate'

const { Option } = Select

export default ({
  getFieldDecorator,
  initialData: { markerLat, markerLng },
  makerList,
  addMaker
}) => {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const handleCancel = () => setShowModal(false)

  return (
    <>
      <FormCol>
        <CustomFormItem label="Sculpture name" hasFeedback>
          {getFieldDecorator('name', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please fill in the sculpture name!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="trophy" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Sculpture name"
            />
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol>
        <CustomFormItem label="Accession ID" hasFeedback>
          {getFieldDecorator('accessionId', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please fill in the unique accession ID!'
              }
            ]
          })(
            <Input
              prefix={
                <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Accession ID"
            />
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol>
        <CustomFormItem label="Primary maker" hasFeedback>
          {getFieldDecorator('primaryMakerId', {
            rules: [
              {
                required: true,
                whitespace: true,
                message: 'Please fill in the primary maker!'
              }
            ]
          })(
            <Select
              placeholder="Primary maker"
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div
                    style={{ padding: '8px', cursor: 'pointer' }}
                    onMouseDown={e => e.preventDefault()} // fix
                    onClick={openModal}
                  >
                    <Icon type="plus" /> Add new maker
                  </div>
                </div>
              )}
            >
              {makerList.map(maker => (
                <Option key={maker.id} value={maker.id}>
                  {maker.firstName + ' ' + maker.lastName}
                </Option>
              ))}
            </Select>
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol>
        <CustomFormItem label="Production date" hasFeedback>
          {getFieldDecorator('productionDate')(
            <Input
              prefix={
                <Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Production date"
            />
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol>
        <CustomFormItem label="Material" hasFeedback>
          {getFieldDecorator('material')(
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
          {getFieldDecorator('creditLine')(
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
          {getFieldDecorator('locationNotes')(
            <TextArea
              placeholder="Location details"
              autosize={{ minRows: 3, maxRows: 5 }}
              style={{ marginTop: 5 }}
            />
          )}
        </CustomFormItem>
      </FormCol>

      <FormCol xs={24} sm={12}>
        <CustomFormItem label="Latitude" hasFeedback className="latitude-input">
          {getFieldDecorator('latitude', {
            rules: [
              {
                validator: validateLatitude
              }
            ],
            initialValue: String(markerLat)
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
          className="longitude-input"
        >
          {getFieldDecorator('longitude', {
            rules: [
              {
                validator: validateLongitude
              }
            ],
            initialValue: String(markerLng)
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

      <MakerCreate
        visible={showModal}
        handleCancel={handleCancel}
        addMaker={addMaker}
      />
    </>
  )
}
