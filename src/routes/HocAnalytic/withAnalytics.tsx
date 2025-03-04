import React, { useEffect } from 'react'

export function withAnalytics(WrappedComponent: Element) {
  return function HocWithAnalytics(props) {
    const trackEvent = (eventType, eventData) => {
      // 发送数据请求
      // 模拟请求示例，请根据实际情况修改具体逻辑
      console.log(`Sending ${eventType} event with data:`, eventData)
    }

    useEffect(() => {
      // 页面加载事件
      trackEvent('pageView', {
        pageUrl: window.location.href,
      })
    }, [])

    return <WrappedComponent trackEvent={trackEvent} {...props} />
  }
}
