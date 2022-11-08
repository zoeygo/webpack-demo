import React from 'react'
import Test1 from '@/routes/Test1'
import Test2 from '@/routes/Test2'
import Cabbage from '@/routes/Cabbage'
import QuickReply from '@/routes/QuickReply'

export const routerItems = [
  {
    path: '/',
    element: <QuickReply />,
    redirect: '/quickReply',
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
]
