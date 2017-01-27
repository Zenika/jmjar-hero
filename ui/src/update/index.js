export default () => {

    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }

}