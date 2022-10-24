import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import { routerItems } from './config/router'

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
        <Route path={path} key={path} element={<Suspense fallback={<Loading />}>{element}</Suspense>}>
          {/* 递归遍历子路由 */}
          {routerViews(children)}
          {redirect ? (
            <Route path={path} element={<Navigate to={redirect} />}></Route>
          ) : (
            <Route path={path} element={<Navigate to={children[0].path} />}></Route>
          )}
        </Route>
      ) : (
        <Route key={path} path={path} element={<Suspense fallback={<Loading />}>{element}</Suspense>}></Route>
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

ReactDOM.render(RouterConfig(), document.getElementById('root'))
