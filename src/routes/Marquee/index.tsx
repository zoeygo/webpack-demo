import React, { useRef, useEffect } from 'react'

import styles from './index.less'

const Marquee: React.FC<any> = ({ children, alwaysScroll = true }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeTextRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    // 定义滚动速度（像素/秒），可根据需求调整
    const scrollSpeed = 16

    if (alwaysScroll) {
      if (marqueeTextRef.current) {
        // 计算文本宽度
        const marqueeTextWidth = marqueeTextRef.current.offsetWidth
        // 计算动画时长（时长 = 距离 / 速度）
        const duration = marqueeTextWidth / scrollSpeed
        // 设置 CSS 变量
        marqueeTextRef.current.style.setProperty('--animation-duration', `${duration}s`)
        marqueeTextRef.current.classList.add(styles['marquee-text-animation'])
      }
    } else {
      if (marqueeRef.current && marqueeTextRef.current) {
        const marqueeWidth = marqueeRef.current.offsetWidth
        const marqueeTextWidth = marqueeTextRef.current.offsetWidth
        if (marqueeTextWidth > marqueeWidth) {
          // 计算动画时长
          const duration = marqueeTextWidth / scrollSpeed
          marqueeTextRef.current.style.setProperty('--animation-duration', `${duration}s`)
          marqueeTextRef.current.classList.add(styles['marquee-text-animation'])
        }
      }
    }
  }, [])

  return (
    <div className={styles['marquee-container']} ref={marqueeRef}>
      <div className={`${styles['marquee-text']}`}>
        <div ref={marqueeTextRef}>{children}</div>
      </div>
    </div>
  )
}

const Index: React.FC<any> = () => {
  const marqueeText = ['111', '222', '333', '444']
  return (
    <Marquee alwaysScroll={true}>
      {marqueeText.map((item, index) => (
        <span key={index}>
          {index + 1}.{item}
        </span>
      ))}
    </Marquee>
  )
}
export default Index
