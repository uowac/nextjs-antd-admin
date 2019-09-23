import { Upload, Button, Icon, message, Row, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { CardStyled, ColStyled } from '../style'
import api from '../../../api'
import Router from 'next/router'
import Head from 'next/head'

const { confirm } = Modal

const defaultFileList = []

const SculptureUploadImage = ({ sculpture }) => {
  const [fileList, setFileList] = useState([...defaultFileList])
  const { accessionId, name } = sculpture

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
          try {
            const _result = await api.delete(`/sculpture-images/${file.uid}`)
            resolve(true)
            setFileList(fileList => fileList.filter(x => x.uid !== file.uid))
            message.success('Deleted image successfully!', 2)
          } catch (error) {
            message.error(error.response.data.message)
            resolve(false)
          }
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
  }

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <>
      <Head>
        <title>Upload images - UOW Sculptures</title>
      </Head>
      <Row gutter={16}>
        <ColStyled xs={24}>
          <CardStyled title={`Upload sculpture image for ${name}`}>
            <Upload
              defaultFileList={[...defaultFileList]}
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
              onClick={() =>
                Router.push(
                  '/sculptures/id/[id]',
                  `/sculptures/id/${accessionId}`
                )
              }
            >
              Finish
            </Button>
          </CardStyled>
        </ColStyled>
      </Row>
    </>
  )
}

export default SculptureUploadImage
