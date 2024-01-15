/**
 * 路由正确匹配
 */
import React, { useContext } from 'react'
import { matchPath } from 'react-router'

import { RouterContext } from './Router'

export default function Switch(props: any) {
  const context: any = useContext(RouterContext)
  const location = props.location || context.location
  let children, match
  // 遍历children Route找到匹配的那个
  React.Children.forEach(props.children, child => {
    // 路由匹配并为React.element元素的时候
    if (!match && React.isValidElement(child)) {
      // 获取Route上的path
      const { path } = child.props as any
      // 匹配的children
      children = child
      const props = child.props as any
      // 计算是否匹配
      match = path ? matchPath(location.pathname, { ...props }) : context.match
    }
  })
  // 克隆一份children，混入computedMatch并渲染
  return match ? React.cloneElement(children, { location, computedMatch: match }) : null
}
