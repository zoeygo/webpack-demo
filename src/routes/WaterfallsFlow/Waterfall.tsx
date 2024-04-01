export default class Waterfall {
  private $el: any
  private count: number
  private gap: number
  private width: number
  private items: Array<any>
  private H: Array<any>
  private flag: any

  constructor(options) {
    this.$el = null // 父容器
    this.count = 4 // 列数
    this.gap = 10 // 间距
    Object.assign(this, options)
    this.width = 0 // 列宽
    this.items = [] // 子元素集合
    this.H = [] // 存储每列的高度方便计算
    this.flag = null // 虚拟节点集合
    this.init()
  }
  init() {
    // items对应li标签
    this.items = Array.from(this.$el.children)
    this.reset()
    this.render()
  }
  reset() {
    this.flag = document.createDocumentFragment()
    this.width = this.$el.clientWidth / this.count
    this.H = new Array(this.count).fill(0)
    this.$el.innerHTML = ''
  }
  render() {
    const { width, items, flag, H, gap } = this
    items.forEach(item => {
      item.style.cssText = `width: ${width}px; position: absolute;`
      let img = item.querySelector('img')
      if (img.complete) {
        // 找出列高最小的那一列
        let tag = H.indexOf(Math.min(...H))
        item.style.cssText = `left: ${tag * (width + gap)}px; top: ${H[tag]}px;`
        H[tag] += (img.height * width) / img.width + gap
        flag.appendChild(item)
      } else {
        img.addEventListener('load', () => {
          let tag = H.indexOf(Math.min(...H))
          item.style.cssText = `left: ${tag * (width + gap)}px; top: ${H[tag]}px;`
          H[tag] += (img.height * width) / img.width + gap
          flag.appendChild(item)
          this.$el.append(flag)
        })
      }
    })
    this.$el.append(flag)
  }
}
