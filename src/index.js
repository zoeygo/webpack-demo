import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { routerItems } from './config/router'
import { RouteGuard } from './routes/RouteGuard'
import { initPerformance } from './utils'

import '../node_modules/antd/dist/antd.css'

// loading页面
const Loading = () => (
  <>
    <div>
      <div>loading...</div>
    </div>
  </>
)

// 递归函数
const routerViews = routerItems => {
  if (routerItems && routerItems.length) {
    return routerItems.map(({ path, element, children, redirect }) => {
      return children && children.length ? (
        <Route
          path={path}
          key={path}
          element={
            <Suspense fallback={<Loading />}>
              <RouteGuard>{element}</RouteGuard>
            </Suspense>
          }
        >
          {/* 递归遍历子路由 */}
          {routerViews(children)}
          {redirect ? (
            <Route path={path} element={<Navigate to={redirect} />}></Route>
          ) : (
            <Route path={path} element={<Navigate to={children[0].path} />}></Route>
          )}
        </Route>
      ) : (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Loading />}>
              <RouteGuard>{element}</RouteGuard>
            </Suspense>
          }
        ></Route>
      )
    })
  }
}

const RouterConfig = () => {
  return (
    <Router>
      <Routes>{routerViews(routerItems)}</Routes>
    </Router>
  )
}

// 初始化性能监控
initPerformance()

ReactDOM.render(RouterConfig(), document.getElementById('root'))
