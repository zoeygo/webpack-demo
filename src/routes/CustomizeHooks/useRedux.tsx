import { createContext, useRef, useContext, useEffect, useState, useMemo } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { shallowEqual } from '@/routes/utils'

export const ReduxContext = createContext(null)

class ReduxHooksStore {
  constructor(reducer, initState) {
    this.name = '__ReduxHooksStore__'
    this.id = 0
    this.reducer = reducer
    this.state = initState
    this.mapConnects = {}
  }
  /* 需要对外传递的接口 */
  exportStore = () => {
    return {
      dispatch: this.dispatch.bind(this),
      subscribe: this.subscribe.bind(this),
      unSubscribe: this.unSubscribe.bind(this),
      getInitState: this.getInitState.bind(this),
    }
  }
  /* 获取初始化 state */
  getInitState = newMapStoreToState => {
    return newMapStoreToState(this.state)
  }
  /* 更新需要更新的组件 */
  publicRender = () => {
    unstable_batchedUpdates(() => {
      /* 批量更新 */
      Object.keys(this.mapConnects).forEach(name => {
        const { update } = this.mapConnects[name]
        update(this.state)
      })
    })
  }
  /* 更新 state  */
  dispatch = action => {
    this.state = this.reducer(this.state, action)
    this.publicRender()
  }
  /* 注册每个 connect  */
  subscribe = connectCurrent => {
    const connectName = this.name + ++this.id
    this.mapConnects[connectName] = connectCurrent
    return connectName
  }
  /* 解除绑定 */
  unSubscribe = connectName => {
    delete this.mapConnects[connectName]
  }
}

/**
 * 注入store
 * 产生一个状态store，通过context上下文传递
 */
export function useCreateStore(reducer, initState) {
  const store = useRef(null)
  // 如果存在，不需要重新实例化store
  if (!store.current) {
    store.current = new ReduxHooksStore(reducer, initState).exportStore()
  }
  return store.current
}

/**
 * 订阅更新
 */
export function useConnect(mapStoreToState?: any) {
  const newMapStoreToState = mapStoreToState ? mapStoreToState : () => {}
  // 获取store内部的重要函数
  const contextValue = useContext(ReduxContext)
  const { getInitState, subscribe, unSubscribe, dispatch } = contextValue
  // 用于传递给业务组件的state
  const stateValue = useRef(getInitState(newMapStoreToState))

  // 渲染函数
  const [, forceUpdate] = useState(null)
  //产生
  const connectValue = useMemo(() => {
    const state = {
      // 用于比较一次dispatch中，新的state和之前的state是否发生变化
      cacheState: stateValue.current,
      // 更新函数
      update: function (newState) {
        // 获取订阅的state
        const selectState = newMapStoreToState(newState)
        // 浅比较state是否发生变化，如果发生变化则更新
        const isEqual = shallowEqual(state.cacheState, selectState)
        state.cacheState = selectState
        stateValue.current = selectState
        if (!isEqual) {
          // 更新
          forceUpdate({})
        }
      },
    }
    return state
  }, [contextValue])

  useEffect(() => {
    // 组件挂载--注册connect
    const name = subscribe(connectValue)
    return function () {
      // 组件卸载--解绑connect
      unSubscribe(name)
    }
  }, [connectValue])

  return [stateValue.current, dispatch]
}
