
import { _electron as electron } from 'playwright';
import { appConfig } from '../web/utils/const';
import Douyin from './Douyin';
import Zxzj from './Zxzj';
import Wyy from './Wyy';

const Script = {
  'dy': Douyin,
  'zxzj': Zxzj,
  'wyy': Wyy,
}

class Control {
  appKey: string;
  order: string;
  win: any
  script: any;

  constructor(appKey, order) {
    this.appKey = appKey
    this.order = order
    
    this._init_(appKey, order)
  }

  async _init_(appKey, order) {
    const url = this.#getAppValue(appKey, 'url')
    console.log('url', url)

    const electronApp = await electron.launch({ 
      args: [url] 
    });
    const window = await electronApp.firstWindow()

    this.win = window
    this.changeApp(appKey)
  }

  set app(appKey: string) {
    this.appKey = appKey
  }
  
  changeApp(appKey) {
    const url = this.#getAppValue(appKey)
    const key = this.#getAppValue(appKey, 'key')
    const script = new Script[key](this.win)
    this.win.goto(url)
    this.script = script
    this.appKey = appKey
  }

  command(order) {
    this.script[order]?.()
  }

  #getAppValue(appKey, attr = 'url') {
    return appConfig.find(a => a.key === appKey)?.[attr]
  }
}

export default Control