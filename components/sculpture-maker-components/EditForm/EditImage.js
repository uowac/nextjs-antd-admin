import { Upload, Button, Icon, message, Row, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { CardStyled, ColStyled } from '../style'
import api from '../../../api'
import Router from 'next/router'

const { confirm } = Modal

const EditImage = ({ accessionId, name, images }) => {
  const [fileList, setFileList] = useState([...images])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemove = file => {
    return new Promise((resolve, reject) => {
      confirm({
        title: 'Do you want to remove this image?',
        icon: <Icon type="exclamation-circle" style={{ color: '#ff4d4f' }} />,
        style: { top: 110 },
        maskClosable: true,
        okText: 'Confirm',
        okButtonProps: {
          style: {
            background: '#ff4d4f',
            borderColor: '#ff4d4f'
          }
        },
        onOk: async () => {
          setIsSubmitting(true)
          try {
            const _result = await api.delete(`/sculpture-images/${file.uid}`)
            resolve(true)
            setFileList(fileList => fileList.filter(x => x.uid !== file.uid))
            message.success('Deleted image successfully!', 2)
          } catch (error) {
            message.error(error.response.data.message)
            resolve(false)
          }
          setIsSubmitting(false)
        },
        onCancel: () => {
          resolve(false)
        }
      })
    })
  }

  const customRequest = async e => {
    const config = {
      headers: {
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        e.onProgress(percentCompleted)
      }
    }

    let data = new FormData()
    data.append('images', e.file)
    data.set('accessionId', accessionId)
    const hide = message.loading('Uploading image...', 0)
    setIsSubmitting(true)

    try {
      const _result = await api.post('/sculpture-images', data, config)
      const file = { ...e.file }
      const { id, url } = _result.data[0]
      file.uid = id
      file.url = url
      file.thumbUrl = url
      file.preview = url
      setFileList(fileList => [...fileList, file])

      e.onSuccess(_result.data[0], e.file)
      hide()
      message.success('Uploaded image successfully!', 2)
    } catch (error) {
      message.error(error.response.data.message)
      e.onError(error.response.data.message)
    }
    setIsSubmitting(false)
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <Upload
          accept="image/*"
          listType="picture-card"
          customRequest={customRequest}
          onRemove={handleRemove}
          fileList={fileList}
        >
          {uploadButton}
        </Upload>

        <Button
          type="primary"
          loading={isSubmitting}
          onClick={() =>
            Router.push('/sculptures/id/[id]', `/sculptures/id/${accessionId}`)
          }
        >
          Finish
        </Button>
      </ColStyled>
    </Row>
  )
}

export default EditImage
