/**
 * Description: Text details edit component for sculpture
 * Author: Hieu Chu
 */

import { useState } from 'react'
import { Input, Icon, Select, Divider } from 'antd'
const { TextArea } = Input
import { FormCol, CustomFormItem } from '../style'
import { validateLatitude, validateLongitude } from '../../shared/utils'
import MakerEdit from './MakerEdit'
import MakerCreate from '../CreateForm/MakerCreate'

const { Option } = Select

export default ({
  getFieldDecorator,
  setFieldsValue,
  getFieldValue,
  initialData: {
    latitude,
    longitude,
    accessionId,
    creditLine,
    locationNotes,
    material,
    name,
    productionDate,
    primaryMakerId
  },
  makerList,
  setMakerList
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalCreate, setShowModalCreate] = useState(false)

  const openModal = () => setShowModal(true)
  const handleCancel = () => setShowModal(false)

  const openModalCreate = () => setShowModalCreate(true)
  const handleCancelCreate = () => setShowModalCreate(false)

  const getCurrentMaker = () => {
    return makerList.find(x => x.id === getFieldValue('primaryMakerId'))
  }

  const addMaker = maker => {
    setMakerList(c => [...c, maker])
    setFieldsValue({
      primaryMakerId: maker.id
    })
  }

  const editMaker = maker => {
    setMakerList(c =>
      c.map(m => {
        if (m.id !== maker.id) {
          return m
        }

        return { ...maker }
      })
    )
    setFieldsValue({
      primaryMakerId: maker.id
    })
  }

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
            ],
            initialValue: name
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
            ],
            initialValue: accessionId
          })(
            <Input
              prefix={
                <Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="text"
              placeholder="Accession ID"
              // disabled
              readOnly
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
            ],
            initialValue: primaryMakerId
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
                    <Icon type="edit" /> Edit current maker
                  </div>
                  <div
                    style={{ padding: '8px', cursor: 'pointer' }}
                    onMouseDown={e => e.preventDefault()} // fix
                    onClick={openModalCreate}
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
          {getFieldDecorator('productionDate', {
            initialValue: productionDate
          })(
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
          {getFieldDecorator('material', {
            initialValue: material
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
            initialValue: creditLine
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
          {getFieldDecorator('locationNotes', {
            initialValue: locationNotes
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
        <CustomFormItem label="Latitude" hasFeedback className="latitude-input">
          {getFieldDecorator('latitude', {
            rules: [
              {
                validator: validateLatitude
              }
            ],
            initialValue: latitude ? String(latitude) : ''
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
            initialValue: longitude ? String(longitude) : ''
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

      <MakerEdit
        visible={showModal}
        handleCancel={handleCancel}
        getCurrentMaker={getCurrentMaker}
        editMaker={editMaker}
      />

      <MakerCreate
        visible={showModalCreate}
        handleCancel={handleCancelCreate}
        addMaker={addMaker}
      />
    </>
  )
}
