import axios from 'axios'

const myApi = axios.create({
  baseURL: 'http://uowac-api.herokuapp.com'
})

export default myApi
