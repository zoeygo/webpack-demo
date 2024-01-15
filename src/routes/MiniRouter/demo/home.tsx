import React from 'react'
import { withRouter } from '../index'

@withRouter
class HomeOne extends React.Component {
  RouteGo = () => {
    const { history } = this.props
    history.push('/detail')
  }
  render() {
    return (
      <div>
        <p>测试HOC——withRouter</p>
        <button onClick={this.RouteGo}>跳转到详情页</button>
      </div>
    )
  }
}

export default function Home() {
  return (
    <div>
      hello,world。 let us learn React!
      <HomeOne />
    </div>
  )
}
