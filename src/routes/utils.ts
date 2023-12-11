import { useCallback } from 'react'
import { isObject, isString } from 'lodash'
const API_HOST = '/test'
// a标签文件下载
function isJSON(str) {
  let result
  try {
    result = JSON.parse(str)
  } catch (e) {
    return false
  }
  return isObject(result) && !isString(result)
}

const handleDrawingDownload = useCallback(() => {
  let fileName = ''
  const reqConfig = new Request(`${API_HOST}`, {
    method: 'GET',
    headers: {
      // Authorization: `bearer ${getAccessToken()}`,
      // 'H-Request-Id': getRequestId(),
      // 'H-Menu-Id': getMenuId(),
      Accept: 'application/json',
    },
  })
  return fetch(reqConfig)
    .then((res: any) => {
      if (isJSON(res) && JSON.parse(res)?.failed) {
        console.log('======error======')
      } else {
        const contentDisposition = res.headers?.get?.('content-disposition')
        const reg = /filename(.*)/
        const originFileName = reg.exec(contentDisposition || '')?.[1]?.trim()
        fileName = decodeURIComponent(
          originFileName?.split?.(originFileName?.includes("utf-8''") ? "*=utf-8''" : '=')?.[1] || ''
        )
        return res.blob()
      }
    })
    .then(blob => {
      if (blob) {
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        const blobURL = window.URL.createObjectURL(blob)
        tempLink.href = blobURL
        tempLink.setAttribute('download', fileName)
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_self')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
      }
    })
}, [])

export { handleDrawingDownload }
