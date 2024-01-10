import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './index.less'

const Test1: React.FC<any> = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['menu-content']}>
      <div>菜单</div>
      <div
        onClick={() => {
          navigate('/quickReply')
        }}
      >
        快捷回复
      </div>
      <div
        onClick={() => {
          navigate('/swipe')
        }}
      >
        无缝轮播
      </div>
      <div
        onClick={() => {
          navigate('/curry')
        }}
      >
        函数柯里化
      </div>
      <div
        onClick={() => {
          navigate('/promise')
        }}
      >
        手写promise
      </div>
      <div
        onClick={() => {
          navigate('/context')
        }}
      >
        react context应用：主题切换
      </div>
      <div
        onClick={() => {
          navigate('/hoc')
        }}
      >
        hoc高阶组件
      </div>
      <div
        onClick={() => {
          navigate('/react-lazy')
        }}
      >
        React.lazy + Susponse模拟异步组件功能
      </div>
      <div
        onClick={() => {
          navigate('/big-data')
        }}
      >
        时间分片
      </div>
      <div
        onClick={() => {
          navigate('/virtual-list')
        }}
      >
        虚拟列表
      </div>
      <div
        onClick={() => {
          navigate('/mobx-demo')
        }}
      >
        mobx demo
      </div>
    </div>
  )
}

export default memo(Test1)
