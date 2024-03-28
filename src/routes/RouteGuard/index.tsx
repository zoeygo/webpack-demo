import { ReactNode, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { routerItems } from '@/config/router'

interface Route {
  path: string
  name: string
  element: ReactNode
  children?: Route[]
  auth?: boolean
}

export const RouterBeforeEach = ({ children }: any) => {
  const location = useLocation()
  const navigator = useNavigate()
  const getCurrentRouterMap = (routers: Route[], path: string): Route => {
    for (let router of routers) {
      if (router.path == path) return router
      if (router.children) {
        const childRouter = getCurrentRouterMap(router.children, path)
        if (childRouter) return childRouter
      }
    }
    return routers[routers.length - 1]
  }

  useEffect(() => {
    let router = getCurrentRouterMap(routerItems, location.pathname)
    const isLogin = window.sessionStorage.getItem('isLogn')
    if (!isLogin && router.auth) {
      navigator('/login')
    }
  }, [location.pathname])
  return children
}
