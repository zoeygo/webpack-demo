import React, { useRef, useEffect } from 'react'

import styles from './index.less'

const Marquee: React.FC<any> = ({ children, alwaysScroll = true }) => {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const marqueeTextRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (alwaysScroll) {
      marqueeTextRef.current.classList.add(styles['marquee-text-animation'])
    } else {
      if (marqueeRef.current && marqueeTextRef.current) {
        const marqueeWidth = marqueeRef.current.offsetWidth
        const marqueeTextWidth = marqueeTextRef.current.offsetWidth
        if (marqueeTextWidth > marqueeWidth) {
          marqueeTextRef.current.classList.add(styles['marquee-text-animation'])
        }
      }
    }
  }, [])

  return (
    <div className={styles['marquee-container']} ref={marqueeRef}>
      <div className={`${styles['marquee-text']}`} ref={marqueeTextRef}>
        {children}
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
          {index + 1}.
          {item}
        </span>
      ))}
    </Marquee>
  )
}
export default Index
