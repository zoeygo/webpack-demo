import React, { useState } from 'react'

import { ReduxContext, useConnect, useCreateStore } from '../useRedux'

function CompA() {
  const [value, setValue] = useState('')
  const [state, dispatch] = useConnect(state => ({ mesB: state.mesB }))
  return (
    <div className='component_box'>
      <p> 组件A</p>
      <p>组件B对我说 ： {state.mesB} </p>
      <input onChange={e => setValue(e.target.value)} placeholder='对B组件说' />
      <button onClick={() => dispatch({ type: 'setA', payload: value })}>确定</button>
    </div>
  )
}

function CompB() {
  const [value, setValue] = useState('')
  const [state, dispatch] = useConnect(state => ({ mesA: state.mesA }))
  return (
    <div className='component_box'>
      <p> 组件B</p>
      <p>组件A对我说 ： {state.mesA} </p>
      <input onChange={e => setValue(e.target.value)} placeholder='对A组件说' />
      <button onClick={() => dispatch({ type: 'setB', payload: value })}>确定</button>
    </div>
  )
}

function CompC() {
  const [state] = useConnect(state => ({ mes1: state.mesA, mes2: state.mesB }))
  return (
    <div className='component_box'>
      <p> 组件C</p>
      <p>组件A内容 ： {state.mes1} </p>
      <p>组件Bnei ： {state.mes2} </p>
    </div>
  )
}

function CompD() {
  const [, dispatch] = useConnect()
  console.log('D 组件更新')
  return (
    <div className='component_box'>
      <p> 组件D</p>
      <button onClick={() => dispatch({ type: 'clear' })}> 清空 </button>
    </div>
  )
}

function Index() {
  const [isShow, setShow] = useState(true)
  return (
    <div>
      <CompA />
      <CompB />
      <CompC />
      {isShow && <CompD />}
      <button onClick={() => setShow(!isShow)}>点击</button>
    </div>
  )
}

function Root() {
  const store = useCreateStore(
    function (state, action) {
      const { type, payload } = action
      if (type === 'setA') {
        return {
          ...state,
          mesA: payload,
        }
      } else if (type === 'setB') {
        return {
          ...state,
          mesB: payload,
        }
      } else if (type === 'clear') {
        // 清空
        return { mesA: '', mesB: '' }
      } else {
        return state
      }
    },
    { mesA: '111', mesB: '111' }
  )
  return (
    <div>
      <ReduxContext.Provider value={store}>
        <Index />
      </ReduxContext.Provider>
    </div>
  )
}
export default Root
