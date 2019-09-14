import { Upload, Button, Icon, message, Row, Modal } from 'antd'
import { useState } from 'react'
import { CardStyled, ColStyled } from '../style'

const { confirm } = Modal

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

const defaultFileList = [
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl:
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  }
]

const SculptureUploadImage = ({ sculpture }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: ''
  })

  const { accessionId, name } = sculpture

  const handleCancel = () => setState({ ...state, previewVisible: false })

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }

  const handleRemove = file => {
    return new Promise((resolve, reject) => {
      confirm({
        title: 'Do you want to remove this image?',
        icon: <Icon type="exclamation-circle" style={{ color: '#ff4d4f' }} />,
        style: { top: 110 },
        okText: 'Confirm',
        okButtonProps: {
          style: {
            background: '#ff4d4f',
            borderColor: '#ff4d4f'
          }
        },
        onOk: () => {
          resolve(true)
        },
        onCancel: () => {
          resolve(false)
        }
      })
    })
  }

  const customRequest = e => {
    const config = {
      headers: {
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
      },
      onUploadProgress: function(progressEvent) {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        console.log(percentCompleted)
      }
    }

    let data = new FormData()
    data.append('file', e.file)

    setTimeout(() => {
      e.onSuccess({ test: 'response sample' }, e.file)
      message.success('Uploaded file successfully!')
    }, 2000)

    // test serverside here, check progress as well?
    // axios
    //   .post(e.action, data, config)
    //   .then(res => e.onSuccess(res.data, e.file))
    //   .catch(err => console.log(err))
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
        <CardStyled title="Upload sculpture image">
          <Upload
            defaultFileList={[...defaultFileList]}
            accept="image/*"
            listType="picture-card"
            customRequest={customRequest}
            onPreview={handlePreview}
            onRemove={handleRemove}
            // onChange={e => console.log(e.fileList)}
          >
            {uploadButton}
          </Upload>
          <Modal
            visible={state.previewVisible}
            footer={null}
            onCancel={handleCancel}
            className="custom-modal"
          >
            <img style={{ width: '100%' }} src={state.previewImage} />
          </Modal>
          <Button type="primary">Finish</Button>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureUploadImage
