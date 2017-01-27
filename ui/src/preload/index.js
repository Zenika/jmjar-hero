import Context from 'Context'

export default () => {

    Context.game.stage.backgroundColor = '#85b5e1';

    Context.game.load.baseURL = 'http://examples.phaser.io/assets/';
    Context.game.load.crossOrigin = 'anonymous';

    Context.game.load.image('player', 'sprites/phaser-dude.png');
    Context.game.load.image('platform', 'sprites/platform.png');

}