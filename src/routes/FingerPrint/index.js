import React, { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const FingerPrint = () => {
  const [fingerprint, setFingerprint] = useState('')

  useEffect(() => {
    // 创建 FingerprintJS 加载器实例
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load() // 加载库
      const result = await fp.get() // 获取指纹数据
      setFingerprint(result.visitorId) // 保存指纹 ID
    }

    loadFingerprint()
  }, [])

  return (
    <div>
      <h1>Device Fingerprint</h1>
      <p>
        Your fingerprint is: <strong>{fingerprint}</strong>
      </p>
    </div>
  )
}

export default FingerPrint
