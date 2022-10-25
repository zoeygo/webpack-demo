import axios from 'axios'

import { notification } from 'antd'

const instance = axios.create({
  baseURL: '',
  timeout: 60000,
})

instance.interceptors.request.use(
  config => {
    const newConfig = config
    newConfig.headers['Content-Type'] = 'application/json'
    newConfig.headers.Accept = 'application/json'
    return newConfig
  },
  err => {
    const error = err
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    const { status, data } = response
    if (status === 204) {
      return response
    }
    if (status === 403 || (status === 200 && data && data.status === 403)) {
      console.log('====未登录')
    }
    if (data && data.failed) {
      notification.error({
        message: data.message,
      })
      if (data.code && data.code === 'error.invalid_session') {
        window.location.reload()
      }
    } else if (data && data.error) {
      notification.error({
        message: data.message,
      })
    } else {
      return data
    }
  },
  error => {
    const { status = '' } = error.response || {}
    if (status === 403) {
      console.log('====未登录')
    } else {
      notification.error({
        message: '接口错误',
      })
    }
  }
)

export default instance
