import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 5000
})

service.interceptors.request.use((config) => {
  return config
}, (error) => {
  console.log('request error: ' + error)
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  if (response.status === 200) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(response)
  }
}, (error) => {
  console.log('response error: ' + error)
  return Promise.reject(error)
})

export default service