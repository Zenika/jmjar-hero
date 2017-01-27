// import preload from './preload'
// import create from './create'
// import update from './update'

import 'pixi'
import 'p2'
import Phaser from 'phaser'

var player;
var platforms;
var cursors;
var jumpButton;

const create = () => {

  player = game.add.sprite(100, 200, 'player');

  game.physics.arcade.enable(player);

  player.body.collideWorldBounds = true;
  player.body.gravity.y = 500;

  platforms = game.add.physicsGroup();

  platforms.create(500, 150, 'platform');
  platforms.create(-200, 300, 'platform');
  platforms.create(400, 450, 'platform');

  platforms.setAll('body.immovable', true);

  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

const preload = () => {
  game.stage.backgroundColor = '#85b5e1';

  game.load.baseURL = 'http://examples.phaser.io/assets/';
  game.load.crossOrigin = 'anonymous';

  game.load.image('player', 'sprites/phaser-dude.png');
  game.load.image('platform', 'sprites/platform.png');

}

const update = () => {
  game.physics.arcade.collide(player, platforms);

  player.body.velocity.x = 0;

  if (cursors.left.isDown) {
    player.body.velocity.x = -250;
  }
  else if (cursors.right.isDown) {
    player.body.velocity.x = 250;
  }

  if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
    player.body.velocity.y = -400;
  }

}

const game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser', {
  preload,
  create,
  update,
})