import Context from 'Context'

export default () => {

    Context.player = Context.game.add.sprite(100, 200, 'player');

    Context.game.physics.arcade.enable(Context.player);

    Context.player.body.collideWorldBounds = true;
    Context.player.body.gravity.y = 500;

    Context.platforms = Context.game.add.physicsGroup();

    Context.platforms.create(500, 150, 'platform');
    Context.platforms.create(-200, 300, 'platform');
    Context.platforms.create(400, 450, 'platform');

    Context.platforms.setAll('body.immovable', true);

    Context.cursors = Context.game.input.keyboard.createCursorKeys();
    Context.jumpButton = Context.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}