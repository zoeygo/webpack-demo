import React, { useState, useRef, useEffect } from 'react'
import styles from './index.less'

function VirtualList() {
  // 保存数据源
  const [dataList, setDataList] = useState([])
  // 截取缓冲区 + 视图区索引
  const [position, setPosition] = useState([0, 0])
  // 获取scroll元素
  const scroll = useRef(null)
  // 获取元素用于容器高度
  const box = useRef(null)
  // 用于移动视图区域，形成滑动效果
  const context = useRef(null)
  const scrollInfo = useRef({
    height: 500, // 容器高度
    bufferCount: 8, // 缓冲区个数
    itemHeight: 60, // 每个item高度
    renderCount: 0, // 渲染区个
  })
  useEffect(() => {
    const height = box.current.offsetHeight
    const { itemHeight, bufferCount } = scrollInfo.current
    const renderCount = Math.ceil(height / itemHeight) + bufferCount
    scrollInfo.current = { renderCount, height, bufferCount, itemHeight }
    const dataList = new Array(1000).fill(1).map((item, index) => index + 1)
    setDataList(dataList)
    setPosition([0, renderCount])
  }, [])
  const handleScroll = () => {
    const { scrollTop } = scroll.current
    const { itemHeight, renderCount } = scroll.current
    const currentOffset = scrollTop - (scrollTop % itemHeight)
    const start = Math.floor(scrollTop / itemHeight)
    // 偏移，造成下滑效果
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`
    const end = Math.floor(scrollTop / itemHeight + renderCount + 1)
    if (end !== position[1] || start !== position[0]) {
      // 如果render内容发生改变，那么截取
      setPosition([start, end])
    }
  }
  const { itemHeight, height } = scrollInfo.current
  const [start, end] = position
  // 渲染区间
  const renderList = dataList.slice(start, end)
  return (
    <div className={styles['list_box']} ref={box}>
      <div className='scroll_box' style={{ height: height + 'px' }} onScroll={handleScroll} ref={scroll}>
        <div className='scroll_hold' style={{ height: `${dataList.length * itemHeight}px` }} />
        <div className='context' ref={context}>
          {renderList.map((item, index) => (
            <div className='list' key={index}>
              {item + ''} Item
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default VirtualList