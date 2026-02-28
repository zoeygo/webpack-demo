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

const handleDownload = () => {
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
}

// 生成随机数
const getRandom = (count: number) => {
  const result: number[] = []
  while (result.length < count) {
    const number: number = parseInt((Math.random() * 10) as any as string, 10)
    if (result.indexOf(number) === -1) result.push(number)
  }
  return result
}

// 比较两个值是否相等
const shallowEqual = (objA, objB) => {
  // 相同且非object类型 或者都为null 则为true
  if (Object.is(objA, objB)) {
    return true
  }
  // 排除objA, objB都为非null object类型的情况
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false
  }
  // 比较object对象
  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)
  if (keysA.length !== keysB.length) {
    return false
  }
  for (let i = 0; i < keysA.length; i++) {
    // Object.hasOwn(objB, keysA[i]) 等价于 objB.hasOwnProperty.call(objB, keysA[i])
    // objB.hasOwnProperty(keysA[i]) 推荐hasOwn
    if (!objB.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }
  return true
}

// 日期向前推一个月
// moment(new Date()).subtract(1, 'months').format('YYYY-MM-DD')

// 图片url转base64：针对https下访问http图片资源被拦截的情况（<img>标签因为其不可修改仍可使用，但如果为脚本/样式会被拦截）
function getBase64FromImageUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous' // 处理跨域问题

    img.onload = function () {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      // 设置canvas尺寸与图片相同
      canvas.width = img.width
      canvas.height = img.height

      // 将图片绘制到canvas上
      ctx.drawImage(img, 0, 0)

      try {
        // 获取Base64编码
        const dataUrl = canvas.toDataURL('image/png')
        resolve(dataUrl)
      } catch (e) {
        reject(e)
      }
    }

    img.onerror = function () {
      reject(new Error('Could not load image at ' + url))
    }

    img.src = url
  })
}

// 判断是否为对象
function isObject(x) {
  return Object.prototype.toString.call(x) === '[object Object]'
}

// 获取数据类型
function getType(data) {
  // 获取到 "[object Type]"，其中 Type 是 Null、Undefined、Array、Function、Error、Boolean、Number、String、Date、RegExp 等。
  const originType = Object.prototype.toString.call(data)
  // 可以直接截取第8位和倒数第一位，这样就获得了 Null、Undefined、Array、Function、Error、Boolean、Number、String、Date、RegExp 等
  const type = originType.slice(8, -1)
  // 再转小写，得到 null、undefined、array、function 等
  return type.toLowerCase()
}

export { handleDownload, getRandom, shallowEqual, getBase64FromImageUrl, isObject, getType }
