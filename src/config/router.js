import React from 'react'
import Test1 from '@/routes/Test1'
import Test2 from '@/routes/Test2'

export const routerItems = [
  {
    path: '/',
    element: <Test1 />,
    redirect: '/test1',
  },
  {
    path: '/test1',
    element: <Test1 />,
  },
  {
    path: '/test2',
    element: <Test2 />,
  },
]
