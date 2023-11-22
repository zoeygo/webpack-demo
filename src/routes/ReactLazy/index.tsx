/**
 * React.lazy + Susponse模拟异步组件功能
 */
import React, { Suspense } from 'react'

/**
 * hoc包装组件
 * @param {*} Component 需要异步数据的component
 * @param {*} api 请求数据接口，返回promise，可以在then中获取与后端交互的数据
 * @returns
 */
function AsyncComponent(Component, api) {
  const AsyncComponentPromise: any = () =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async resolve => {
      const data = await api()
      resolve({
        // 以props形式将数据传递给目标组件，实现异步效果
        default: props => <Component rdata={data} {...props} />,
      })
    })
  return React.lazy(AsyncComponentPromise)
}

// 数据模拟
const getData = () => {
  return new Promise(resolve => {
    // 模拟异步
    setTimeout(() => {
      resolve({
        name: 'alien',
        say: 'let us learn react',
      })
    }, 1000)
  })
}

// 测试异步组件
function Test({ rdata, age }: any) {
  const { name, say } = rdata
  return (
    <div>
      <div>hello, my name is {name}</div>
      <div>age: {age}</div>
      <div>i want to say {say}</div>
    </div>
  )
}

// 父组件
export default class Index extends React.Component {
  /* 需要每一次在组件内部声明，保证每次父组件挂载，都会重新请求数据 ，防止内存泄漏。 */
  LazyTest = AsyncComponent(Test, getData)
  render() {
    const { LazyTest } = this
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <LazyTest age={18} />
        </Suspense>
      </div>
    )
  }
}
