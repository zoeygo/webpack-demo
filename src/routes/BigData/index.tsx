import React, { useState, useMemo } from 'react'

// 获取随机色
function getColor() {
  const r = Math.floor(Math.random() * 255)
  const g = Math.floor(Math.random() * 255)
  const b = Math.floor(Math.random() * 255)
  return `rgba(${r},${g},${b},0.8)`
}

// 获取随机位置
function getPosition(position) {
  const { width = 1, height = 1 } = position || {}
  return {
    left: Math.ceil(Math.random() * width) + 'px',
    top: Math.ceil(Math.random() * height) + 'px',
  }
}

// 色块组件
function Circle({ position }: any) {
  const style = useMemo(() => {
    return {
      background: getColor(),
      ...getPosition(position),
      width: '10px',
      height: '10px',
    }
  }, [])
  return <div style={style} />
}

class Index extends React.Component {
  state = {
    dataList: [], // 数据源列表
    renderList: [], // 渲染列表
    position: {
      width: 0,
      height: 0,
    }, // 位置信息
    eachRenderNum: 500, // 每次渲染数量
  }
  box = React.createRef() as any
  componentDidMount(): void {
    const { offsetHeight, offsetWidth } = this.box.current
    const originList = new Array(20000).fill(1)
    // 计算需要渲染次数，Math.ceil向上舍入
    const times = Math.ceil(originList.length / this.state.eachRenderNum)
    let index = 1
    this.setState(
      {
        position: { height: offsetHeight, width: offsetWidth },
        dataList: originList,
      },
      () => {
        this.toRenderList(index, times)
      }
    )
  }

  toRenderList = (index, times) => {
    // 渲染完成，退出
    if (index > times) return
    const { renderList } = this.state
    // 通过缓存element把所有渲染完成的list缓存下来，下一次更新，直接跳过渲染
    renderList.push(this.renderNewList(index))
    this.setState({
      renderList,
    })
    // 用 requestIdleCallback 代替 setTimeout 浏览器空闲执行下一批渲染
    requestIdleCallback(() => {
      this.toRenderList(++index, times)
    })
  }

  renderNewList(index) {
    // 得到最新的渲染列表
    const { dataList, position, eachRenderNum } = this.state
    const list = dataList.slice((index - 1) * eachRenderNum, index * eachRenderNum)
    return (
      <React.Fragment key={index}>
        {list.map((item, index) => (
          <Circle key={index} position={position} />
        ))}
      </React.Fragment>
    )
  }

  render() {
    // const { renderList, position } = this.state
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexWrap: 'wrap' }} ref={this.box}>
        {/* {renderList.map((item, index) => (
          <Circle position={position} key={index} />
        ))} */}
        {this.state.renderList}
      </div>
    )
  }
}

// 控制展示index
const App = () => {
  const [show, setShow] = useState(false)
  const [btnShow, setBtnShow] = useState(true)
  const handleClick = () => {
    setBtnShow(false)
    setTimeout(() => {
      setShow(true)
    }, 0)
  }
  return (
    <div>
      {btnShow && <button onClick={handleClick}>show</button>}
      {show && <Index />}
    </div>
  )
}
export default App
