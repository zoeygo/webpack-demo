import { makeObservable, observable, action } from 'mobx'

class Communi {
  constructor() {
    // 新版本必须调用 makeObservable
    makeObservable(this)
  }
  @observable mesA = ''
  @observable mesB = ''
  @action setMesA(mes: string) {
    this.mesA = mes
  }
  @action setMesB(mes: string) {
    this.mesB = mes
  }
}
export default new Communi()
