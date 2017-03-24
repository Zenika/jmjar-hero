function getNote(x, callback) {

    let humanTime = 500;
    let speed = (targetY - topOrigin) / 3000;
    let distance = humanTime * speed;

    let isOk = false;
    let result = new mojs.Shape({
        x: x,
        shape: 'circle',
        y: topOrigin,
        radius: {0: noteRadius},
        fill: 'darkcyan',
        scale: {0: 1},
        duration: 500,
        delay: 0,
        easing: 'cubic.out',
        isShowStart: true
    }).then({
        y: {[topOrigin]: targetY - distance},
        duration: 2500,
        delay: 0,
        easing: 'linear.none',
        onComplete: function () {
            isOk = false;
            console.log('nop');
        }
    }).then({
        y: {[targetY - distance]: targetY},
        duration: 500,
        delay: 0,
        easing: 'linear.none',
    }).then({
        fill: {['darkcyan']: 'white'},
        radius: {[noteRadius]: 0},
        duration: 100,
        easing: 'cubic.out',
        onComplete: function () {
            console.log(isOk);
            callback(isOk);
        }
    });
    result.triggerOk = function () {
        isOk = true;
    }
    return result;
}