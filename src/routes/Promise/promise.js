const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

// promise解决过程
function resolvePromise(promise, x, resolve, reject) {
  // 如果promise和x指向同一对象，以typeerror为据因拒绝执行promise
  // 防止死循环
  if (promise === x) {
    return reject(new TypeError('the promise and the return value are the same'))
  }
  if (x instanceof MyPromise) {
    /**
     * 如果x为promise,则使promise接受x的状态
     * 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
     * if判断和下面判断then然后拿到执行重复，可有可无
     */
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject)
    }, reject)
  } else if (typeof x === 'object' || typeof x === 'function') {
    // x为对象或函数
    if (x === null) {
      return resolve(x)
    }
    let then
    try {
      // x.then赋值给then
      // eslint-disable-next-line prefer-destructuring
      then = x.then
    } catch (error) {
      // 若取x.then的值时抛出错误e，则以e为据因拒绝promise
      return reject(error)
    }

    // 如果then是函数
    if (typeof then === 'function') {
      let called = false
      // 将x作为函数的作用域this调用
      // 传递两个回调函数作为参数，第一个参数叫做resolvePromise，第二个参数叫做rejectPromise
      try {
        then.call(
          x,
          // 如果resolvePromise以值y为参数被调用，则运行[[Resolve]](promise, y)
          function (y) {
            // 如果resolvePromise和rejectPromise均被调用
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          // 如果rejectPromise以据因r为参数被调用，则以据因r拒绝promise
          function (r) {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (error) {
        // 如果调用then方法抛出了异常e
        // 如果resolvePromise或rejectPromise已经被调用则忽略
        if (called) return
        // 否则以e为据因拒绝promise
        reject(error)
      }
    } else {
      // 如果then不是函数，以x为参数执行promise
      resolve(x)
    }
  } else {
    // 如果x不为对象或函数，以x为参数执行promise
    resolve(x)
  }
}

function MyPromise(fn) {
  // 初始状态为pending
  this.status = PENDING
  // 初始化value
  this.value = null
  // 初始化reason
  this.reason = null
  // 存储成功和失败的回调
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  // 存一下this，以便resolve和reject里面访问
  const that = this
  function resolve(value) {
    if (that.status === PENDING) {
      that.status = FULFILLED
      that.value = value
      that.onFulfilledCallbacks.forEach(callback => {
        callback(that.value)
      })
    }
  }
  function reject(reason) {
    if (that.status === PENDING) {
      that.status = REJECTED
      that.reason = reason
      that.onRejectedCallbacks.forEach(callback => {
        callback(that.reason)
      })
    }
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

MyPromise.prototype.then = function resolveThen(onFulfilled, onRejected) {
  // 如果onFulfilled不是函数，给一个默认函数，返回value
  let realOnFulfilled = onFulfilled
  if (typeof realOnFulfilled !== 'function') {
    realOnFulfilled = function realFulfilled(value) {
      return value
    }
  }

  // 如果onFulfilled不是函数，给一个默认函数，返回reason的error
  let realOnRejected = onRejected
  if (typeof realOnRejected !== 'function') {
    realOnRejected = function rejectThen(reason) {
      if (reason instanceof Error) {
        throw reason
      } else {
        throw new Error(reason)
      }
    }
  }

  /**
   * 如果onFulfilled或者onRejected抛出异常，则promise2必须拒绝执行，并返回拒绝原因e
   * 将onFulfilled和onRejected用try...catch...包起来，有错就reject
   */
  if (this.status === FULFILLED) {
    // onFulfilled(this.value);
    const promise2 = new MyPromise(function a(resolve, reject) {
      setTimeout(function a() {
        try {
          // 如果onFulfilled不是函数且promise1成功执行，promise2必须成功执行并返回相同的值
          if (typeof onFulfilled !== 'function') {
            resolve(this.value)
          } else {
            const x = realOnFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
    return promise2
  }
  if (this.status === REJECTED) {
    // onRejected(this.reason);
    const promise2 = new MyPromise(function a(resolve, reject) {
      setTimeout(function b() {
        try {
          if (typeof onRejected !== 'function') {
            reject(this.reason)
          } else {
            const x = realOnRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
    return promise2
  }
  /**
   * ----构造函数里面添加两个数组存储成功和失败的回调----
   * new Promise(fn).then(onFulfilled, onRejected);
   * then是在实例对象一创建好就调用了，这时候fn里的异步操作可能还没结束，
   * status为pending，这时候不能立即调onFulfilled或onRejected
   * 当fn里面主动调resolve或者reject的时候才知道成功/失败
   * 所以应该把onFulfilled和onRejected两个回调存起来，等待fn执行完毕再执行对应代码
   * 因为then链式调用，会有多个onFulfilled和onRejected，用数组存储，等fn有结论时将数组中的方法拿出执行
   */
  if (this.status === PENDING) {
    // this.onFulfilledCallbacks.push(realOnFulfilled);
    // this.onRejectedCallbacks.push(realOnRejected);
    const promise2 = new MyPromise(function a(resolve, reject) {
      // pending状态，将resolve和reject分别存进数组
      // 执行到then且状态为pending时，push进数组，等fn执行完成后开始执行
      this.onFulfilledCallbacks.push(function f() {
        setTimeout(function a() {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.value)
            } else {
              const x = realOnFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
      this.onRejectedCallbacks.push(function r() {
        setTimeout(function b() {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.reason)
            } else {
              const x = realOnRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
    })
    return promise2
  }
}

export default MyPromise
