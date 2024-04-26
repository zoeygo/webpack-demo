import React, { memo } from 'react'
import { Button } from 'antd'
import { sendRequest, concurrencyRequest } from './utils'

const Test1: React.FC<any> = () => {
  const handleConcurrency = () => {
    const urls = []
    for (let i = 1; i <= 20; i++) {
      urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
    }
    concurrencyRequest(urls, 3).then(res => {
      console.log(res)
    })
  }
  const callBack = result => {
    console.log('promise-all-result', result)
  }
  const handlePromiseAll = () => {
    const urls = []
    for (let i = 1; i <= 20; i++) {
      urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
    }
    sendRequest(urls, 3, callBack)
  }
  return (
    <div>
      <Button onClick={handleConcurrency}>并发请求数量控制</Button>
      <Button onClick={handlePromiseAll}>并发请求promise.all</Button>
    </div>
  )
}

export default memo(Test1)
