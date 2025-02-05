import { action, observable, runInAction, makeAutoObservable } from 'mobx'

class CountDown {
  // @observable count: number = 0 -- 替换为makeAutoObservable写法，@observable修饰符仍有效，但需要 makeObservable(this)
  count: number

  startTime: number

  constructor() {
    // runInAction 确保count在更改过程中不会触发任何观察者，直到所有更改都完成为止
    runInAction(() => {
      this.count = 0
    })
    // 捕获已经存在的对象属性并且使得它们变为可观察的
    // 6及以上版本加上该段代码，监听更新
    // 自动推断所有属性为 observable，方法为 action
    makeAutoObservable(this)
    // makeObservable(this, {
    //   count: observable, // 明确标记为 observable
    //   setCount: action, // 明确标记为 action
    // })
  }

  // @action -- 替换为makeAutoObservable写法,使用@action这种方式符合严格模式
  setCount() {
    // 计算时间差
    const millis = Date.now() - this.startTime
    this.count = 60 - Math.floor(millis / 1000)
  }

  start() {
    this.startTime = Date.now()
    this.count = 60
    const timer = setInterval(() => {
      this.setCount()
      // 倒计时结束
      if (this.count <= 0) {
        clearInterval(timer)
      }
    }, 1000)
  }
}
export default CountDown
