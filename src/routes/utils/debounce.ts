/**
 * 防抖：一段时间后执行相关逻辑，该段时间内重新触发则重新计时
 * 原理：闭包记录一个timer，每次要执行防抖函数时，假如上一个timer还没结束就clear掉重新定一个执行原函数的timer
 * 应用场景：输入框搜索；浏览器窗口调整；按钮点击；页面滚动事件；频繁的鼠标移动事件；
 * @param fn 传入的函数
 * @param delay 延迟的时间
 * @returns
 */
function debounce(fn, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

export default debounce
