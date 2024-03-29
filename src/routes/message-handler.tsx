/**
 * 与iframe窗口交互
 */
class MessageHandler {
  static allowOrigin = '*'

  static callbacks = {}

  static iframe

  static startFlag = false

  /**
   * 添加事件绑定
   * @param messageType 消息类型
   * @param callback 回调
   * @returns {MessageHandler}
   */
  static on(messageType, callback) {
    if (!messageType || !callback) return this
    if (!this.callbacks[messageType]) {
      this.callbacks[messageType] = []
    }
    this.callbacks[messageType].push(callback)
    return this
  }

  static cancel(messageType, callback) {
    if (callback && this.callbacks[messageType] && this.callbacks[messageType].length) {
      this.callbacks[messageType] = this.callbacks[messageType].filter(cb => cb !== callback)
    } else {
      delete this.callbacks[messageType]
    }
    return this
  }

  static executeHandler = event => {
    const { data } = event
    if (this.callbacks[data.type]) {
      this.callbacks[data.type].forEach(cb => cb(event))
    }
  }

  /**
   * 开始监听消息
   */
  static start() {
    if (this.startFlag) return
    this.startFlag = true
    window.addEventListener('message', this.executeHandler, false)
  }

  static destory() {
    this.startFlag = false
    this.callbacks = {}
    this.iframe = undefined
    window.removeEventListener('message', this.executeHandler, false)
  }

  /**
   * 向iframe窗口发送信息
   * @param {object} message 消息体
   */
  static postMessage(message = {}) {
    if (this.iframe) {
      this.iframe.contentWindow.postMessage(message, this.allowOrigin)
    } else {
      window.postMessage(message, this.allowOrigin)
    }
  }
}

export function postMessage(type, message = {}) {
  MessageHandler.postMessage({ type, ...message })
}

export class Events {
  static parentDragStart = 'PARENT_DRAG_START'

  static parentDrag = 'PARENT_DRAG'

  static parentDragEnd = 'PARENT_DRAG_END'

  static sendLinkMessage = 'SEND_LINK_MESSAGE'

  static sendTextMessage = 'SEND_TEXT_MESSAGE'

  static parentBindSupplier = 'PARENT_BIND_SUPPLIER'

  static themeConfig = 'THEME_CONFIG'

  static setHost = 'SET_HOST' // 向智能客服发送当前域名

  static sendLoadChatHub = 'SEND_LOAD_CHAT_HUB'
}

export default MessageHandler
