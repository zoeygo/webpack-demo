import React from 'react'
import Test1 from '@/routes/Test1'
import Test2 from '@/routes/Test2'
import Cabbage from '@/routes/Cabbage'
import QuickReply from '@/routes/QuickReply'
import Swipe from '@/routes/Swipe';
import Curry from '@/routes/Curry';

export const routerItems = [
  {
    path: '/',
    element: <Curry />,
    redirect: '/Curry',
  },
  {
    path: '/test1',
    element: <Test1 />,
  },
  {
    path: '/test2',
    element: <Test2 />,
  },
  {
    path: '/cabbage',
    element: <Cabbage />,
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
]
