import React, { useState } from 'react'

import useLog, { LogContext } from '../useLog'

function Home() {
  const [dom, reportMessage] = useLog()
  return (
    <div>
      {/* 监听内部点击 */}
      <div ref={dom}>
        <p>react进阶实践指南</p>
        <button>按钮 one (内部点击)</button>
        <button>按钮 two (内部点击)</button>
        <button>按钮 three (内部点击)</button>
      </div>
      {/* 外部点击 */}
      <button
        onClick={() => {
          console.log(reportMessage)
        }}
      >
        外部点击
      </button>
    </div>
  )
}
// 阻断useState的更新效应
const Index = React.memo(Home)
export default function Root() {
  const [value, setValue] = useState({})
  return (
    <LogContext.Provider value={value}>
      <Index />
      <button
        onClick={() => {
          setValue({
            name: 'react demo',
          })
        }}
      >
        点击
      </button>
    </LogContext.Provider>
  )
}
