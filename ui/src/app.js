import 'pixi'
import 'p2'
import Phaser from 'phaser'
import Game from 'Game'

import preload from 'preload'
import create from 'create'
import update from 'update'

Game.startGame(new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload,
  create,
  update,
}))