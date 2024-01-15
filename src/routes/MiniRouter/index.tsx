/**
 * 入口文件
 * 采用history库，完成react-router和react-router-dom部分
 * 涉及：
 * 路由更新流程与原理
 * 自定义hooks编写与使用
 * context实践
 * hoc编写与使用
 */
// component
import Router, { RouterContext } from './component/Router'
import Route from './component/Route'
import Switch from './component/Switch'
// hooks
import { useHistory, useListen, useLocation } from './hooks'
// hoc
import withRouter from './withRouter'

export { Router, Switch, Route, RouterContext, useHistory, useListen, useLocation, withRouter }
