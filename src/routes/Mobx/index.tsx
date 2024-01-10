/**
 * 根组件注入状态
 */
import React, { Component } from 'react'
import { Provider } from 'mobx-react'

import Communi from './model'
import { ComponentA, ComponentB } from './Component'

// inject从context中取出store对象，注入到组件的props中
export default class App extends Component {
  render() {
    return (
      <Provider store={Communi}>
        <ComponentA />
        <ComponentB />
      </Provider>
    )
  }
}
