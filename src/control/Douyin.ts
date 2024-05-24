
class Douyin {
  private win: any;

  constructor(win) {
    this.win = win
  }

  // 上一个
  async previous() {
    await this.win.click("div[class='xgplayer-playswitch-prev']")
  }

  // 下一个
  async next() {
    await this.win.click("div[class='xgplayer-playswitch-next']")
  }

  // 点赞/取消
  async like() {
    await this.win.click("div[class='S_2Ks3ov']")
  }

  // 评论
  async comment() {
    await this.win.click("div[class='kT7icnwc']")
  }

  // 收藏/取消
  async collect() {
    await this.win.click("div[class='YwBJNLMd']")
  }

  // 播放/暂停
  async play() {
    await this.win.click("xg-icon[class='xgplayer-play']")
  }

  // 连播/取消
  async playAuto() {
    await this.win.click("xg-icon[class='xgplayer-autoplay-setting']")
  }

  // 清屏/取消
  async clearScreen() {
    await this.win.click("xg-icon[class='xgplayer-immersive-switch-setting']")
  }

  // 进入网页全屏/退出全屏
  async webFullscreen() {
    await this.win.click("xg-icon[class='xgplayer-page-full-screen']")
  }

  // 进入全屏/退出全屏
  async fullscreen() {
    await this.win.click("xg-icon[class='xgplayer-fullscreen']")
  }

}

export default Douyin