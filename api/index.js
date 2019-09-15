import axios from 'axios'

const myApi = axios.create({
  baseURL: 'https://uowac-api.herokuapp.com'
})

export default myApi
