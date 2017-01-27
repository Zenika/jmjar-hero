import 'pixi'
import 'p2'
import Phaser from 'phaser'
import Context from 'Context'

import preload from 'preload'
import create from 'create'
import update from 'update'

Context.game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload,
  create,
  update,
})