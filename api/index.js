/**
 * Description: Axios instance to call back-end API with HTTP Authorization header attached to every request
 * Author: Hieu Chu
 */

import axios from 'axios'
import nookies from 'nookies'

const myApi = axios.create({
  baseURL: 'https://uowac-api.herokuapp.com'
})

myApi.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${nookies.get({}).accessToken}`
    return config
  },
  error => {
    console.log('error axios!')
    return Promise.reject(error)
  }
)

export default myApi
