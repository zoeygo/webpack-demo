import React, { memo } from 'react'
import { Button } from 'antd'
import { observer, useLocalObservable } from 'mobx-react-lite'
import CountDown from '@/utils/countdown'

// 实例化写在外面，在这种情况下，store 是组件的外部实例，组件每次渲染时都引用同一个 store 实例，MobX 可以正确地追踪 store 的 count 变化，并自动更新组件
// const countdown = new CountDown()
const CountDownComponent: React.FC<any> = () => {
  const countdown = useLocalObservable(() => new CountDown())
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

export default memo(observer(CountDownComponent))
