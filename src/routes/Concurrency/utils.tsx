// 并发请求函数
const sendRequest = (tasks: any[], max: number, callBack: Function) => {
  let index = 0
  let together = new Array(max).fill(null)
  const result = []
  together = together.map(() => {
    return new Promise(resolve => {
      const run = () => {
        if (index >= tasks.length) {
          resolve(result)
          return
        }
        let cur = index
        let task = tasks[index++]
        // 或者不采用链式调用，采取promise.race，完成一个则执行下一个
        fetch(task)
          .then(res => {
            result[cur] = res
            run()
          })
          .catch(err => {
            result[cur] = err
            run()
            // rejects(err)
          })
      }
      run()
    })
  })
  Promise.all(together).then(() => callBack(result))
}

// 并发请求函数
const concurrencyRequest = (urls, maxNum) => {
  return new Promise(resolve => {
    if (urls.length === 0) {
      resolve([])
      return
    }
    const results = []
    // 下一个请求的下标
    let index = 0
    // 当前请求完成的数量
    let count = 0
    // 发送请求
    async function request() {
      if (index === urls.length) return
      // 保存序号，使result和urls相对应
      const i = index
      const url = urls[index]
      index++
      console.log(url)
      // 或者不采用await，采取promise.race，完成一个则执行下一个
      try {
        const resp = await fetch(url)
        // resp加入到results
        results[i] = resp
      } catch (err) {
        // err加入到results
        results[i] = err
      } finally {
        count++
        // 判断是否所有的请求都已完成
        if (count === urls.length) {
          console.log('完成了')
          resolve(results)
        }
        request()
      }
    }
    // maxNum和urls.length取最小进行调用
    const times = Math.min(maxNum, urls.length)
    for (let i = 0; i < times; i++) {
      request()
    }
  })
}

export { sendRequest, concurrencyRequest }
