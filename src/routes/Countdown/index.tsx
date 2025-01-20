import React, { memo } from 'react'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import CountDown from '@/utils/countdown'

const Test: React.FC<any> = () => {
  const countdown = new CountDown()
  const { count } = countdown
  const handleCount = () => {
    countdown.start()
  }
  return (
    <div>
      <Button onClick={handleCount} disabled={count > 0}>
        倒计时：{count}s
      </Button>
    </div>
  )
}

export default memo(observer(Test))
