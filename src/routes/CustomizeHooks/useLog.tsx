/**
 * 自定义hooks
 */

// 自动上报pv / click的埋点hooks - useLog
import { createContext, useContext, useRef, useCallback, useEffect } from 'react'

export const LogContext = createContext({})

// 依赖关系：context改变->让引入context的reportMessage重新声明
// ->让绑定DOM事件监听的useEffect里面能够绑定最新的reportMessage
export default function useLog() {
  // 一些公共参数
  const message = useContext(LogContext)
  const listenDOM: any = useRef(null)

  // 分清依赖关系 -> message 改变
  const reportMessage = useCallback(
    function (data, type) {
      if (type === 'pv') {
        // pv 上报
        console.log('组件pv上报', message)
      } else if (type === 'click') {
        // 点击上报
        console.log('组件click上报', message, data)
      }
    },
    [message]
  )
  useEffect(() => {
    const handleClick = function (e) {
      reportMessage(e.target, 'click')
    }
    if (listenDOM.current) {
      listenDOM.current.addEventListener('click', handleClick)
    }
    return function () {
      listenDOM.current && listenDOM.current.removeEventListener('click', handleClick)
    }
  }, [reportMessage])

  return [listenDOM, reportMessage]
}
