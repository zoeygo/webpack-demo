import React from 'react'
import { Router, Route, useHistory, useListen, Switch } from '../index'

/* 引用业务组件 */
import Detail from './detail' /* 详情页 */
import Home from './home' /* 首页 */
import List from './list' /* 列表页 */
import './index.less'

const menusList = [
  {
    name: '首页',
    path: '/home',
  },
  {
    name: '列表',
    path: '/list',
  },
  {
    name: '详情',
    path: '/detail',
  },
]
/**/
function Nav() {
  const history = useHistory()
  /* 路由跳转 */
  const routerGo = url => history.push(url)
  const path = history.location.pathname
  return (
    <div>
      {menusList.map(item => (
        <span
          className={`nav ${item.path === path ? 'active' : ''}`}
          key={item.path}
          onClick={() => routerGo(item.path)}
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

function Top() {
  /* 路由监听 */
  useListen(location => {
    console.log('当前路由是：', location.pathname)
  })
  return <div>--------top------</div>
}
function Index() {
  // 根组件渲染
  return (
    <Router>
      <Top />
      <Nav />
      <Switch>
        <Route component={Home} path='/home'></Route>
        <Route component={Detail} path='/detail' />
        <Route path='/list' render={props => <List {...props} />} />
      </Switch>
      <div>--------bottom------</div>
    </Router>
  )
}

export default Index
