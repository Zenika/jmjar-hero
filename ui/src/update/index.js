import Context from 'Context'

export default () => {

    Context.game.physics.arcade.collide(Context.player, Context.platforms);

    Context.player.body.velocity.x = 0;

    if (Context.cursors.left.isDown)
    {
        Context.player.body.velocity.x = -250;
    }
    else if (Context.cursors.right.isDown)
    {
        Context.player.body.velocity.x = 250;
    }

    if (Context.jumpButton.isDown && (Context.player.body.onFloor() || Context.player.body.touching.down))
    {
        Context.player.body.velocity.y = -400;
    }

}