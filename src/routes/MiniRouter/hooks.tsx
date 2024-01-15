import { useContext, useEffect } from 'react'
import { RouterContext, rootHistory } from './component/Router'

// 用useContext获取上下文中的history对象
export function useHistory() {
  const { history } = useContext(RouterContext) as any
  return history
}

// 用useContext获取上下文中的location对象
export function useLocation() {
  const { location } = useContext(RouterContext) as any
  return location
}

// 自定义hooks编写:监听路由改变
export function useListen(cb) {
  useEffect(() => {
    if (!rootHistory) return () => {}
    // 绑定路由事件监听器
    const unlisten = rootHistory.listen(({ location }) => {
      cb && cb(location)
    })
    return function () {
      unlisten && unlisten()
    }
  }, [])
}
