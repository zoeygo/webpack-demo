/**
 * 手写简易版
 */
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// 作为构造函数使用
function MyPromise(fn) {
  this.status = PENDING
  this.value = null
  this.reason = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  /**
   * 必须存储this，否则resolve和reject内部this丢失。
   * 或者直接改用箭头函数
   * MyPromise直接调用时，MyPromise和函数内的函数this都指向windows
   * MyPromise被new后，其this指向new出来的对象，MyPromise函数内的函数指向windows
   */
  // const _this = this;
  // function resolve(value) {
  //     if (_this.status === PENDING) {
  //         _this.status = FULFILLED;
  //         _this.value = value;
  //         _this.onFulfilledCallbacks.forEach(cb => {
  //             cb(_this.value);
  //         });
  //     }
  // }

  // function reject(reason) {
  //     if (_this.status === PENDING) {
  //         _this.status = REJECTED;
  //         _this.reason = reason;
  //         _this.onRejectedCallbacks.forEach(cb => {
  //             cb(_this.reason);
  //         });
  //     }
  // }

  const resolve = value => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.value = value
      this.onFulfilledCallbacks.forEach(cb => {
        cb(this.value)
      })
    }
  }

  const reject = reason => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reason = reason
      this.onRejectedCallbacks.forEach(cb => {
        cb(this.reason)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
MyPromise.prototype.then = function then(onFulfilled, onRejected) {
  if (this.status === FULFILLED) {
    onFulfilled(this.value)
  }
  if (this.status === REJECTED) {
    onRejected(this.reason)
  }
  if (this.status === PENDING) {
    this.onFulfilledCallbacks.push(onFulfilled)
    this.onRejectedCallbacks.push(onRejected)
  }
}
// 使用new调用时，this指向new出来的对象
const promise1 = new MyPromise(resolve => {
  setTimeout(() => {
    resolve('request1 success')
  }, 1000)
})
promise1.then(function p1(value) {
  console.log('promise1.then-value===', value)
})

const promise2 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('request2 failed')
  }, 2000)
})
// 再跟上.then的话，需要处理上方返回值
promise2.then(
  function p2f(value) {
    console.log('promise2.then-value===', value)
  },
  function p2r(reason) {
    console.log('promise2.then-reason===', reason)
  }
)

// export default MyPromise;
