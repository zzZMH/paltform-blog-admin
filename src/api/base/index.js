import service from './request'
import qs from 'qs'

const get = (url) => {
  return new Promise((resolve, reject) => {
    service.get(url).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

const post = (url, params) => {
  return new Promise((resolve, reject) => {
    service.post(url, qs.stringify(params)).then((res) => {
      resolve(res.data)
    }).catch((err) => {
      reject(err)
    })
  })
}

const installAPI = (Vue) => {
  Vue.prototype.$get = get
  Vue.prototype.$post = post
}

export default installAPI
