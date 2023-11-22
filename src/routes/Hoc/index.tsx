/**
 * 权限控制
 */
import React, { createContext, useState, useEffect } from 'react'

export const Permission = createContext([])

// 在根部注入权限
export default function Index(props: any) {
  const [rootPermission, setRootPermission] = useState([])
  useEffect(() => {
    // 获取权限列表
    // getRootPermission().then(res => {
    //   const { code, data } = res as any
    //   code === 200 && setRootPermission(data) // ['docList', 'tagList']
    // })
    setRootPermission(['docList', 'tagList'])
  }, [])
  return (
    <Permission.Provider value={rootPermission}>
      {/* <RootRouter /> */}
      {props.children}
    </Permission.Provider>
  )
}

/* 没有权限 */
function NoPermission() {
  return <div>暂无权限</div>
}

/* 编写HOC */
export function PermissionHoc(authorization) {
  return function (Component) {
    return function Home(props) {
      // 匹配权限
      const matchPermission = (value, list) => list.indexOf(value)
      return (
        <Permission.Consumer>
          {/* 此处的permissionList即rootPermission */}
          {permissionList =>
            matchPermission(authorization, permissionList) >= 0 ? <Component {...props} /> : <NoPermission />
          }
        </Permission.Consumer>
      )
    }
  }
}
