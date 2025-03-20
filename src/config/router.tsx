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
import WaterfallsFlow from '@/routes/WaterfallsFlow'
import Concurrency from '@/routes/Concurrency'
import ThreeJs from '@/routes/ThreeJs/demo'
import Countdown from '@/routes/Countdown'
import HookAnalytic from '@/routes/HookAnalytic'
import HocAnalytic from '@/routes/HocAnalytic'
import TextToSpeech from '@/routes/TextToSpeech'
import WebSocketDemo from '@/routes/WebSocketDemo'
import VideoCarousel from '@/routes/VideoCarousel'

interface Route {
  path: string
  name: string
  meaning: string
  element: ReactNode
  redirect?: string
  children?: Route[]
  auth?: boolean
}

export const routerItems: Route[] = [
  {
    path: '/',
    name: 'menu',
    meaning: '菜单',
    element: <Menu />,
    redirect: '/Menu',
    // auth: true, // 需要权限校验
  },
  {
    path: '/quickReply',
    name: 'quickReply',
    meaning: '快捷回复',
    element: <QuickReply />,
  },
  // 无缝轮播
  {
    path: '/swipe',
    name: 'swipe',
    meaning: '无缝轮播',
    element: <Swipe />,
  },
  // 函数柯里化
  {
    path: '/curry',
    name: 'curry',
    meaning: '函数柯里化',
    element: <Curry />,
  },
  // 手写promise
  {
    path: '/promise',
    name: 'promise',
    meaning: '手写promise',
    element: <Promise />,
  },
  // react context应用
  {
    path: '/context',
    name: 'context',
    meaning: 'react context应用：主题切换',
    element: <Context />,
  },
  // hoc 高阶组件
  {
    path: '/hoc',
    name: 'hoc',
    meaning: 'hoc高阶组件',
    element: <Hoc />,
  },
  // React.lazy + Susponse模拟异步组件功能
  {
    path: '/react-lazy',
    name: 'react-lazy',
    meaning: 'React.lazy + Susponse模拟异步组件功能',
    element: <ReactLazy />,
  },
  // 大数据量下时间分片
  {
    path: '/big-data',
    name: 'big-data',
    meaning: '大数据量下时间分片',
    element: <BigData />,
  },
  // 虚拟列表
  {
    path: '/virtual-list',
    name: 'virtual-list',
    meaning: '虚拟列表',
    element: <VirtualList />,
  },
  // mobx
  {
    path: '/mobx-demo',
    name: 'mobx-demo',
    meaning: 'mobx demo',
    element: <MobxDemo />,
  },
  // 路由模拟
  {
    path: '/mini-router',
    name: 'mini-router',
    meaning: '路由模拟',
    element: <MiniRouter />,
  },
  // 自定义hooks
  {
    path: '/customize-hooks',
    name: 'customize-hooks',
    meaning: '自定义hooks',
    element: <CustomizeHooks />,
  },
  // 图片瀑布流
  {
    path: '/waterfalls-flow',
    name: 'waterfalls-flow',
    meaning: '图片瀑布流',
    element: <WaterfallsFlow />,
  },
  // 并发请求数量控制
  {
    path: '/concurrency',
    name: 'concurrency',
    meaning: '并发请求数量控制',
    element: <Concurrency />,
  },
  // threeJs
  {
    path: '/threeJs',
    name: 'threeJs',
    meaning: 'threeJs',
    element: <ThreeJs />,
  },
  // 60s倒计时
  {
    path: '/countdown',
    name: 'countdown',
    meaning: '60s倒计时',
    element: <Countdown />,
  },
  // 自定义hook实现埋点
  {
    path: '/hookAnalytic',
    name: 'hookAnalytic',
    meaning: '自定义hook实现埋点',
    element: <HookAnalytic />,
  },
  // 高阶组件实现埋点
  {
    path: '/hocAnalytic',
    name: 'hocAnalytic',
    meaning: '高阶组件实现埋点',
    element: <HocAnalytic />,
  },
  // 文本转语音播放
  {
    path: '/text-to-speech',
    name: 'text-to-speech',
    meaning: '文本转语音播放',
    element: <TextToSpeech />,
  },
  {
    path: '/websocket-demo',
    name: 'websocket-demo',
    meaning: 'WebSocket心跳检测',
    element: <WebSocketDemo />,
  },
  {
    path: '/video-carousel',
    name: 'video-carousel',
    meaning: '视频轮播',
    element: <VideoCarousel />,
  },
]