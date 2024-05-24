
class Wyy {
  private win: any;

  constructor(win) {
    this.win = win
  }

  async play() {
    await this.win.click("div[class='xgplayer-playswitch-prev']")
  }

}

export default Wyy