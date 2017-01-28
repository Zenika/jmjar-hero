class Game {

  constructor() {
    this.buttons = []
  }

  startGame(game) {
    this.game = game
  }

  addButton(key, x, y, sprite) {
    this.buttons[key] = this.game.add.sprite(x, y, sprite, 20)
  }

}


export default new Game()