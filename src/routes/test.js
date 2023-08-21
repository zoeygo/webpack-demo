// 1、实现一个function组件接收一个传入值num，内部定义一个count
// 2、组件内部实现一个定时器每隔1s，打印count+num的值
// 3、有一个清空按钮，点击重制count的值
// 4、num每隔500ms会发生变化

import React, { useState, useEffect, useRef } from 'react'

interface propsValue {
  num: Number;
}

// class组件的实现
function Test(props: propsValue) {
  const { num } = props
  const [count, setCount] = useState(1)
  const ref = useRef(null)
  ref.current.value = num
  useEffect(() => {
    const value = ref.current.value + count
    const a = setInterval(() => {
      console.log(value)
    }, 1000)
    return () => {
      clearInterval(a)
    }
  }, [count])

  return (
    <>
      <div ref={ref} />
      <button onClick={setCount(1)}>重置count</button>
    </>
  )
}
export default Test
