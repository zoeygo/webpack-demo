import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { routerItems } from '@/config/router'

import styles from './index.less'

const Test1: React.FC<any> = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['menu-content']}>
      <div>菜单</div>
      {routerItems.map((item, index) => (
        <div
          onClick={() => {
            navigate(item.path)
          }}
        >
          {index + 1}.{item.meaning}
        </div>
      ))}
    </div>
  )
}

export default memo(Test1)
