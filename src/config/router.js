import React from 'react'
import Menu from '@/routes/Menu'
import QuickReply from '@/routes/QuickReply'
import Swipe from '@/routes/Swipe/demo'
import Curry from '@/routes/Curry'
import Promise from '@/routes/Promise'
import Context from '@/routes/Context'
import Hoc from '@/routes/Hoc/Test'
import ReactLazy from '@/routes/ReactLazy'
import BigData from '@/routes/BigData'
import VirtualList from '@/routes/VirtualList'
import MobxDemo from '@/routes/Mobx'

export const routerItems = [
  {
    path: '/',
    element: <Menu />,
    redirect: '/Menu',
  },
  {
    path: '/quickReply',
    element: <QuickReply />,
  },
  // 无缝轮播
  {
    path: '/swipe',
    element: <Swipe />,
  },
  // 函数柯里化
  {
    path: '/curry',
    element: <Curry />,
  },
  // 手写promise
  {
    path: '/promise',
    element: <Promise />,
  },
  // react context应用
  {
    path: '/context',
    element: <Context />,
  },
  // hoc 高阶组件
  {
    path: '/hoc',
    element: <Hoc />,
  },
  // React.lazy + Susponse模拟异步组件功能
  {
    path: '/react-lazy',
    element: <ReactLazy />,
  },
  // 大数据量下时间分片
  {
    path: '/big-data',
    element: <BigData />,
  },
  // 虚拟列表
  {
    path: '/virtual-list',
    element: <VirtualList />,
  },
  // mobx
  {
    path: '/mobx-demo',
    element: <MobxDemo />,
  },
]
