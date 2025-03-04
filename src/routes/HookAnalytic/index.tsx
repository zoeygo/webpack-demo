import React from 'react'
import { Button } from 'antd'
import { useAnalytics } from './useAnalytics'

function HookAnalytic() {
  const { trackEvent } = useAnalytics() // 按钮点击事件

  const handleClick = () => {
    trackEvent('buttonClick', {
      buttonId: 'myButton',
    })
  }

  return (
    <Button id='myButton' onClick={handleClick}>
      Click Me
    </Button>
  )
}

export default HookAnalytic
