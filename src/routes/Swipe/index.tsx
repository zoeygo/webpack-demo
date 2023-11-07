import React, { memo, useEffect, useState, useCallback, useRef } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from './index.less'

interface imgProps {
  name?: string
  url: string
  link?: string // 点击图片跳转的链接
}
interface SwipeProps {
  imgUrl: imgProps[] // 图片名称和地址
  showNum?: number // 可视区展示的图片数量，默认5
  itemWidth?: string // 图片宽度，默认200px
  itemHeight?: string // 图片高度，默认200px
  itemRightMargin?: string // 轮播图之间的外边距，默认0
  border?: boolean // 轮播图是否显示border，默认false
  autoplay?: boolean // 是否自动切换
  duration?: number // 自动切换动画时间,默认2000ms
  loop?: boolean // 无缝轮播，默认true
  swipeKey?: string // 轮播标识，防止一个页面多个轮播，出现id重复的情况。不传值则取时间戳
}

const Swipe = (props: SwipeProps) => {
  const {
    imgUrl,
    showNum = 5,
    itemWidth = '200px',
    itemHeight = '200px',
    itemRightMargin = '0px',
    border = false,
    autoplay = false,
    duration = 2000,
    loop = true,
    swipeKey = new Date().valueOf(),
  } = props
  const swipeRef = useRef<HTMLDivElement | null>(null)
  const [imgArr, setImgArr] = useState(imgUrl)
  const [step, setStep] = useState(0)
  const [autoFlag, setAutoFlag] = useState(autoplay && imgUrl.length > showNum)
  // 定时器对象
  let timer: any

  useEffect(() => {
    let imgClone: imgProps[] = []
    // 无缝轮播且图片数量大于轮播可视区图片数量时，额外拷贝数组
    imgClone =
      (loop || autoplay) && imgUrl.length > showNum 
      ? imgClone.concat(imgUrl, imgUrl.slice(0, showNum)) 
      : imgClone.concat([], imgUrl)
    setImgArr(imgClone)
  }, [])

  useEffect(() => {
    // 自动轮播设置定时器
    if (autoFlag) {
      timer = setInterval(handleNext, duration)
    }
    return () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, [step, autoFlag])

  const handlePre = useCallback(() => {
    let value: number = step - 1
    if (value === -1) {
      // 此时数组结构如下：[1,2,3,4,5,6,1,2,3,4,5]
      value = imgUrl.length - 1
      if (swipeRef.current) {
        // 从第一个 1 pre，实现方式为：1重定向到第二个 1，然后再向前pre到 6
        swipeRef.current.style.cssText = `transition: none; transform: translateX(calc((${itemWidth} + ${itemRightMargin}) * (-${imgUrl.length})));`
        setTimeout(() => {
          swipeRef.current.style.cssText = `transform: translateX(calc((${itemWidth} + ${itemRightMargin}) * (-${value})));transition: all 500ms linear;`
        }, 0)
      }
    } else {
      if (swipeRef.current) {
        swipeRef.current.style.cssText = `transform: translateX(calc((${itemWidth} + ${itemRightMargin}) * (-${value})));transition: all 500ms linear;`
      }
    }
    setStep(value)
  }, [step, imgArr])

  const handleNext = useCallback(() => {
    let value: number = step + 1
    if (value > imgUrl.length) {
      // [1,2,3,4,5,6,2-1,2-2,2-3,2-4,2-5],从2-1移动至2-2
      value = 1
      if (swipeRef.current) {
        // 重定向到第一张图片，然后再进行滚动
        swipeRef.current.style.cssText = `transition: none; transform: translateX(0);`
        setTimeout(() => {
          swipeRef.current.style.cssText = `transform: translateX(calc((${itemWidth} + ${itemRightMargin}) * (-${value})));transition: all 500ms linear;`
        }, 50)
      }
    } else {
      if (swipeRef.current) {
        swipeRef.current.style.cssText = `transform: translateX(calc((${itemWidth} + ${itemRightMargin}) * (-${value})));transition: all 500ms linear;`
      }
    }
    setStep(value)
  }, [step, imgArr])

  // 鼠标移出，有自动轮播的继续轮播
  const handleScroll = useCallback(() => {
    setAutoFlag(autoplay && imgUrl.length > showNum)
  }, [])

  // 鼠标移入停止自动轮播，清除定时器
  const clearScroll = useCallback(() => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    setAutoFlag(false)
  }, [])

  const containerStyle = {
    width: `calc((${itemWidth} * ${showNum}) + (${itemRightMargin} * (${showNum} - 1)))`,
    height: itemHeight,
  }

  const swipeBoxStyle = {
    width: `calc(${itemWidth} * ${imgUrl.length})`,
    height: itemHeight,
  }
  const common = {
    width: itemWidth,
    height: itemHeight,
    marginRight: itemRightMargin,
  }
  return (
    <div
      className={styles['swipe-container']}
      style={containerStyle}
      onMouseEnter={clearScroll}
      onMouseLeave={handleScroll}
    >
      {/* 传入的图片数量大于可视区图片数量时，显示左右箭头 */}
      {imgUrl.length > showNum && (
        <div className='swipe-arrow'>
          {((!loop && step > 0) || loop) && (
            <div className='swipe-arrow-left' onClick={handlePre}>
              <LeftOutlined />
            </div>
          )}
          {((!loop && step < imgUrl.length - showNum) || loop) && (
            <div className='swipe-arrow-right' onClick={handleNext}>
              <RightOutlined />
            </div>
          )}
        </div>
      )}
      {/* 可视区展示图片 */}
      <div
        ref={swipeRef}
        id={swipeKey.toString()}
        className='swipe-box'
        style={{
          ...swipeBoxStyle,
        }}
      >
        {imgArr.map((item: imgProps, index: number) => (
          <div
            className={`swipe-item ${index + 1 === showNum + step ? 'swipe-item-last' : ''}
            ${border ? 'swipe-item-border' : ''}
            ${!item.name ? 'swipe-item-center' : ''}
            `}
            style={common}
            key={index}
          >
            <img
              src={item.url}
              alt=''
              onClick={() => {
                if (item.link) {
                  window.open(item.link)
                }
              }}
            />
            {item.name && <div className='swipe-item-name'>{item.name}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default memo(Swipe)
