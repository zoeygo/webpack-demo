import React from 'react'
import { Button } from 'antd'
import { withAnalytics } from './withAnalytics'

function HookAnalytic({ trackEvent }) {
  // 按钮点击事件
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

export default withAnalytics(HookAnalytic)
