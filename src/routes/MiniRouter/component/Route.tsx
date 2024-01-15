/**
 * 控制更新
 */
import React, { useContext } from 'react'
import { matchPath } from 'react-router'
import { RouterContext } from './Router'

function Route(props: any) {
  const context: any = useContext(RouterContext)
  // 获取Location对象
  const location = props.location || context.location
  // 是否匹配当前路由，如果父级有switch，就会传入computedMatch来精确匹配渲染此路由
  const match = props.computedMatch
    ? props.computedMatch
    : props.path
    ? matchPath(props, location.pathname)
    : context.match
  // 这个props用于传递给路由组件
  const newRouterProps = { ...context, location, match }
  let { children, component, render } = props
  if (Array.isArray(children) && children.length === 0) children = null
  let renderChildren = null
  if (newRouterProps.match) {
    if (children) {
      // 当 Router 是 props children 或者 render props 形式
      renderChildren = typeof children === 'function' ? children(newRouterProps) : children
    } else if (component) {
      // Route有component属性
      renderChildren = React.createElement(component, newRouterProps)
    } else if (render) {
      // Route有render属性
      renderChildren = render(newRouterProps)
    }
  }
  // 逐层传递上下文
  return <RouterContext.Provider value={newRouterProps}>{renderChildren}</RouterContext.Provider>
}
export default Route
