/**
 * 瀑布流
 */
import React, { useEffect } from 'react'

import png1 from './img/1.png'
import png2 from './img/2.png'
import png3 from './img/3.png'
import png4 from './img/4.png'
import png5 from './img/5.png'
import png6 from './img/6.png'
import png7 from './img/7.png'
import png8 from './img/8.png'
import png9 from './img/9.png'
import png10 from './img/10.png'
import png11 from './img/11.png'
import png12 from './img/12.png'
import png13 from './img/13.png'
import png14 from './img/14.png'
import png15 from './img/15.png'
import png16 from './img/16.png'
import png17 from './img/17.png'
import png18 from './img/18.png'
import png19 from './img/19.png'
import png20 from './img/20.png'
import Waterfall from './Waterfall'

import styles from './index.less'

const list = [
  png1,
  png2,
  png3,
  png4,
  png5,
  png6,
  png7,
  png8,
  png9,
  png10,
  png11,
  png12,
  png13,
  png14,
  png15,
  png16,
  png17,
  png18,
  png19,
  png20,
]

function WaterfallsFlow() {
  // 瀑布流js+absolute方案，但没生效
  // 可能执行时机晚于window.onload
  // useEffect(() => {
  //   window.addEventListener('load', handleLoad)
  //   return () => {
  //     window.removeEventListener('load', handleLoad)
  //   }
  // }, [])

  // const handleLoad = () => {
  //   new Waterfall({
  //     $el: document.querySelector('#img-wrapper'),
  //     count: 4,
  //     gap: 10,
  //   })
  // }

  return (
    <>
      <ul className={styles['img-wrapper']} id='img-wrapper'>
        {list.map((item, index) => (
          <li>
            <img src={item} alt={`alt_${index + 1}`} />
          </li>
        ))}
      </ul>
    </>
  )
}

export default WaterfallsFlow
