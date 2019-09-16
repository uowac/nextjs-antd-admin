import { useState, useEffect } from 'react'
import { Row, Divider, Modal, Icon, message, notification } from 'antd'
import { ColStyled, CardStyled, StyledTable } from './style'
import MakerEdit from './EditForm/MakerEdit'
import api from '../../api'
import Loading from '../Loading'
import Error from 'next/error'

const { confirm } = Modal

const MakerList = () => {
  useEffect(() => {
    const fetchMakerList = async () => {
      try {
        const data = (await api.get('/maker/')).data

        const formattedData = data.map(maker => {
          let formattedMaker = { ...maker }
          formattedMaker.key = maker.id
          return formattedMaker
        })

        console.log(formattedData)
        setMakerList(formattedData)
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

  const [makerList, setMakerList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [showModal, setShowModal] = useState(false)
  const [currentMakerId, setCurrentMakerId] = useState('')
  const openModal = makerId => {
    setCurrentMakerId(makerId)
    setShowModal(true)
  }

  const handleCancel = () => setShowModal(false)

  const getCurrentMaker = () =>
    makerList.find(x => x.id === currentMakerId) || {}

  const editMaker = maker => {
    setMakerList(list =>
      list.map(x => {
        if (x.id === maker.id) {
          return { ...maker, key: maker.id }
        }
        return x
      })
    )
  }

  const deleteMaker = makerId => {
    setMakerList(list => list.filter(x => x.id !== makerId))
  }

  const handleDelete = makerId => {
    confirm({
      title: 'Do you want to remove this maker?',
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
          const _result = await api.delete(`/maker/${makerId}`)
          deleteMaker(makerId)
          message.success('Deleted maker successfully!', 2)
        } catch (error) {
          console.log(error.response.data.message)
          notification.error({
            message: 'Error',
            description:
              'There has been internal server error or the maker you\'re trying to delete is currently associated with a sculpture.'
          })
        }
      }
    })
  }

  const columns = [
    {
      title: 'Maker name',
      key: 'makerName',
      width: '22%',
      render: (_, record) => {
        const { firstName, lastName, wikiUrl } = record
        const makerName = firstName + ' ' + lastName
        if (!wikiUrl) {
          return <span>{makerName}</span>
        }
        return <a href={wikiUrl}>{makerName}</a>
      },
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      defaultSortOrder: 'ascend'
    },

    {
      title: 'Nationality',
      dataIndex: 'nationality',
      width: '22%'
    },
    {
      title: 'Birth year - Death year',
      key: 'year',
      width: '28%',
      render: (_, record) => {
        let { birthYear, deathYear } = record
        if (!birthYear) birthYear = 'N/A'
        if (!deathYear) deathYear = 'N/A'
        return <span>{birthYear + ' - ' + deathYear}</span>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: record => (
        <span>
          <a onClick={() => openModal(record.key)}>Edit</a>
          <Divider type="vertical" />
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </span>
      )
    }
  ]

  if (loading) return <Loading />
  if (error)
    return <Error statusCode={error.statusCode} title={error.message} />

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="Maker List">
          <StyledTable
            dataSource={makerList}
            columns={columns}
            pagination={false}
            style={{ maxWidth: 750 }}
          />
        </CardStyled>
      </ColStyled>

      <MakerEdit
        visible={showModal}
        handleCancel={handleCancel}
        getCurrentMaker={getCurrentMaker}
        editMaker={editMaker}
      />
    </Row>
  )
}

export default MakerList
