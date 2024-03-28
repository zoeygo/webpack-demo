/**
 * 2024/3/27
 * 手动实现并发请求控制
 */

class RequestQueue {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent // 设置最大并发数
    this.currentRunning = 0 // 当前正在运行的请求数
    this.queue = [] // 等待执行的请求队列
  }

  // 将请求封装成一个函数，推入队列，并尝试执行
  enqueue(url) {
    return new Promise((resolve, reject) => {
      const task = () => {
        // 当请求开始时，currentRunning 加 1
        this.currentRunning++
        sendRequest(url)
          .then(resolve)
          .catch(reject)
          .finally(() => {
            // 请求结束后，currentRunning 减 1，并尝试执行下一个请求
            this.currentRunning--
            this.dequeue()
          })
      }
      this.queue.push(task)
      this.dequeue() // 每次添加请求后尝试执行请求
    })
  }

  dequeue() {
    // 如果当前运行的请求小于最大并发数，并且队列中有待执行的请求
    if (this.currentRunning < this.maxConcurrent && this.queue.length) {
      // 从队列中取出一个请求并执行
      const task = this.queue.shift()
      task()
    }
  }
}

// 这个函数是模拟发送请求的，实际中你可能需要替换成真实的请求操作
function sendRequest(url) {
  console.log(`Sending request to ${url}`)
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`Response received from ${url}`)
      resolve(`Result from ${url}`)
    }, Math.random() * 2000) // 随机延时以模拟请求处理时间
  })
}

// 使用 RequestQueue
const requestQueue = new RequestQueue(3) // 假设我们限制最大并发数为3

// 模拟批量请求
const urls = ['url1', 'url2', 'url3', 'url4', 'url5', 'url6']
urls.forEach(url => {
  requestQueue.enqueue(url).then(result => {
    console.log(result)
  })
})
