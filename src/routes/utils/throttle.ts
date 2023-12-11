/**
 * 节流：一段时间内无论触发多少次只执行一次
 * 原理：闭包记录一个timer，每次要执行节流函数时，假如上一个timer还没结束就直接无视，结束了才重新加timer
 * 应用场景：浏览器窗口调整；页面滚动事件；鼠标移动事件；表单输入验证；定时器和轮询
 * @param fn 传入的函数
 * @param delay 延迟的时间
 * @returns
 */
function throttle(fn, delay) {
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}

export default throttle
