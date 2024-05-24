
class Zxzj {
  private win: any;

  constructor(win) {
    this.win = win
    this.closeNotify()
  }

  // 关闭通知
  async closeNotify() {
    await this.win.waitForSelector('#globalAd')
    await this.win.click('#content > a')
  }

  // 移除广告
  async removeAd() {
    // 
  }
}

export default Zxzj