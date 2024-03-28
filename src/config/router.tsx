import React, { ReactNode } from 'react'

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
import MiniRouter from '@/routes/MiniRouter/demo'
import CustomizeHooks from '@/routes/CustomizeHooks'
interface Route {
  path: string
  name: string
  element: ReactNode
  redirect?: string
  children?: Route[]
  auth?: boolean
}

export const routerItems: Route[] = [
  {
    path: '/',
    name: 'menu',
    element: <Menu />,
    redirect: '/Menu',
    auth: true, // 需要权限校验
  },
  {
    path: '/quickReply',
    name: 'quickReply',
    element: <QuickReply />,
  },
  // 无缝轮播
  {
    path: '/swipe',
    name: 'swipe',
    element: <Swipe />,
  },
  // 函数柯里化
  {
    path: '/curry',
    name: 'curry',
    element: <Curry />,
  },
  // 手写promise
  {
    path: '/promise',
    name: 'promise',
    element: <Promise />,
  },
  // react context应用
  {
    path: '/context',
    name: 'context',
    element: <Context />,
  },
  // hoc 高阶组件
  {
    path: '/hoc',
    name: 'hoc',
    element: <Hoc />,
  },
  // React.lazy + Susponse模拟异步组件功能
  {
    path: '/react-lazy',
    name: 'react-lazy',
    element: <ReactLazy />,
  },
  // 大数据量下时间分片
  {
    path: '/big-data',
    name: 'big-data',
    element: <BigData />,
  },
  // 虚拟列表
  {
    path: '/virtual-list',
    name: 'virtual-list',
    element: <VirtualList />,
  },
  // mobx
  {
    path: '/mobx-demo',
    name: 'mobx-demo',
    element: <MobxDemo />,
  },
  // 路由模拟
  {
    path: '/mini-router',
    name: 'mini-router',
    element: <MiniRouter />,
  },
  // 自定义hooks
  {
    path: '/customize-hooks',
    name: 'customize-hooks',
    element: <CustomizeHooks />,
  },
]