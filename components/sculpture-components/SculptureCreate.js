import { useState, useEffect } from 'react'
import {
  Row,
  Card,
  Typography,
  Tooltip,
  Input,
  Empty,
  Button,
  Dropdown,
  Icon,
  Menu
} from 'antd'
const { Text } = Typography
const { Meta } = Card
const { Search } = Input
import Link from 'next/link'
import { ColStyled, CardStyled, DescriptionIcon, ShadowCard } from './style'
import styled from 'styled-components'

const SculptureCreate = () => {
  const [form, setForm] = useState({
    title: '',
    primaryMaker: '',
    createdDate: '',
    material: '',
    creditLine: '', // textarea
    location: '' // textarea, detailed location notes
  })

  const handleInputChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  return (
    <Row gutter={16}>
      <ColStyled xs={24}>
        <CardStyled title="Create new sculpture">
          <div>Hey yo</div>
        </CardStyled>
      </ColStyled>
    </Row>
  )
}

export default SculptureCreate
