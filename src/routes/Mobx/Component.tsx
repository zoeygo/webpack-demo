/* eslint-disable react/prop-types */
import React from 'react'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export class ComponentA extends React.Component {
  // 组件A
  state = { compAsay: '' }
  render(): React.ReactNode {
    const { compAsay } = this.state
    const {
      store: { mesB = '', setMesA },
    } = this.props as any
    return (
      <div>
        <p>我是组件A</p>
        <div>B组件对我说：{mesB}</div>
        我对B组件说：
        <input onChange={e => this.setState({ compAsay: e.target.value })} placeholder='compAsay' />
        <button onClick={() => setMesA(compAsay)}>确定</button>
      </div>
    )
  }
}

@inject('store')
@observer
export class ComponentB extends React.Component {
  // 组件A
  state = { compBsay: '' }
  render(): React.ReactNode {
    const { compBsay } = this.state
    const {
      store: { mesA = '', setMesB },
    } = this.props as any
    return (
      <div>
        <p>我是组件B</p>
        <div>A组件对我说：{mesA}</div>
        我对A组件说：
        <input onChange={e => this.setState({ compBsay: e.target.value })} placeholder='compBsay' />
        <button onClick={() => setMesB(compBsay)}>确定</button>
      </div>
    )
  }
}
