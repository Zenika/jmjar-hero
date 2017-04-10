function getNote(channel, delay, callback) {

    let humanTime = 500;
    let speed = (targetY - topOrigin) / 3000;
    let distance = humanTime * speed;

    let isOk = false;
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
        y: {[topOrigin]: targetY - distance},
        duration: 2500,
        delay: 0,
        easing: 'linear.none',
        onComplete: function () {
            isOk = false;
            document.addEventListener('keydown', eventListener);
        }
    }).then({
        y: {[targetY - distance]: targetY},
        duration: 500,
        delay: 0,
        easing: 'linear.none',
    }).then({
        radius: {[noteRadius]: 0},
        duration: 100,
        easing: 'cubic.out',
        onComplete: function () {
            callback(isOk);
            document.removeEventListener('keydown', eventListener);
            this.el.remove();
        }
    });

    function eventListener(event) {
        if (event.key === channel.key) {
            isOk = true;
        }
    }

    return result;
}
