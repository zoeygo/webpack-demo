/**
 * 事件总线
 * eventObject: { [eventName]: [ callback1, callback2, ... ] }
 * eventObject: { [eventName]: { [callbackId]: callback1, ... } }
 */

interface ICallbackList {
  [id: string]: Function
}

interface IEventObject {
  [eventName: string]: ICallbackList
}

interface ISubscribe {
  unSubscribe: () => void
}

interface IEventBus {
  publish<T extends any[]>(eventName: string, ...args: T): void
  subscribe(eventName: string, callback: Function): ISubscribe
  subscribeOnce(eventName: string, callback: Function): ISubscribe
  clear(eventName: string): void
}

class EventBus implements IEventBus {
  private _eventObject: IEventObject
  private _callbackId: number
  constructor() {
    // 初始化事件列表
    this._eventObject = {}
    // 回调函数列表的id
    this._callbackId = 0
  }
  // 发布事件
  publish<T extends any[]>(eventName: string, ...args: T): void {
    // 取出当前事件所有的回调函数
    const callbackObject = this._eventObject[eventName]

    if (!callbackObject) return console.warn(eventName + ' not found!')

    // 执行每一个回调函数
    for (let id in callbackObject) {
      // 执行时传入参数
      callbackObject[id](...args)

      // 只订阅一次的回调函数需要删除
      if (id[0] === 'd') {
        delete callbackObject[id]
      }
    }
  }
  // 订阅事件
  subscribe(eventName: string, callback: Function): ISubscribe {
    // 初始化这个事件
    if (!this._eventObject[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this._eventObject[eventName] = {}
    }

    const id = this._callbackId++

    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this._eventObject[eventName][id] = callback

    // 每一次订阅事件，都生成唯一一个取消订阅的函数
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this._eventObject[eventName][id]

      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this._eventObject[eventName]).length === 0) {
        delete this._eventObject[eventName]
      }
    }

    return { unSubscribe }
  }

  // 只订阅一次
  subscribeOnce(eventName: string, callback: Function): ISubscribe {
    // 初始化这个事件
    if (!this._eventObject[eventName]) {
      // 使用对象存储，注销回调函数的时候提高删除的效率
      this._eventObject[eventName] = {}
    }

    // 标示为只订阅一次的回调函数
    const id = 'd' + this._callbackId++

    // 存储订阅者的回调函数
    // callbackId使用后需要自增，供下一个回调函数使用
    this._eventObject[eventName][id] = callback

    // 每一次订阅事件，都生成唯一一个取消订阅的函数
    const unSubscribe = () => {
      // 清除这个订阅者的回调函数
      delete this._eventObject[eventName][id]

      // 如果这个事件没有订阅者了，也把整个事件对象清除
      if (Object.keys(this._eventObject[eventName]).length === 0) {
        delete this._eventObject[eventName]
      }
    }

    return { unSubscribe }
  }

  // 清除事件
  clear(eventName: string): void {
    // 未提供事件名称，默认清除所有事件
    if (!eventName) {
      this._eventObject = {}
      return
    }

    // 清除指定事件
    delete this._eventObject[eventName]
  }
}

// 测试
// interface IObj {
//   msg: string
// }

// type PublishType = [IObj, number]

// const eventBus = new EventBus()

// // 订阅事件eventX
// eventBus.subscribe('eventX', (obj: IObj, num: number) => {
//   console.log('模块A', obj, num)
// })
// eventBus.subscribe('eventX', (obj: IObj, num: number) => {
//   console.log('模块B', obj, num)
// })
// eventBus.subscribe('eventX', (obj: IObj, num: number) => {
//   console.log('模块C', obj, num)
// })

// // 发布事件eventX
// eventBus.publish('eventX', { msg: 'EventX published!' }, 1)

// // 清除
// eventBus.clear('eventX')

// 再次发布事件eventX，由于已经清除，所有模块都不会再收到消息了
// eventBus.publish<PublishType>('eventX', { msg: 'EventX published again!' }, 2)

/**
 * 全局单例
 */
// 不管哪一个模块想使用我们的事件总线，我们都想这些模块使用的是同一个实例，
// 这就是全局单例，这种设计能更容易统一管理事件。
class EventBusTool {
  private static _eventBus?: EventBus

  constructor() {}

  public static getEventBus(): EventBus {
    // 第一次初始化
    if (this._eventBus == undefined) {
      this._eventBus = new EventBus()
    }

    // 后续每次直接取唯一一个实例，保持全局单例
    return this._eventBus
  }
}

// 使用
const eventBus = EventBusTool.getEventBus()
