function getNote(channel, delay, callback) {

    let result = new mojs.Shape({
        x: channel.x,
        shape: 'circle',
        y: topOrigin,
        radius: {0: noteRadius},
        fill: 'white',
        scale: {0: 1},
        duration: 500,
        delay: delay,
        easing: 'cubic.out',
        isShowStart: true,
        parent: harp
    }).then({
        y: {[topOrigin]: targetY + 50},
        duration: 2500,
        delay: 0,
        easing: 'linear.none'
    }).then({
        radius: {[noteRadius]: 0},
        duration: 100,
        easing: 'cubic.out',
        onComplete: function () {
            callback()
        }
    });

    return result;
}
