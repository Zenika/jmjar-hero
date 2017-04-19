function getNote(channel, delay, callback) {

    let humanTime = 500;
    let speed = (targetY - topOrigin) / 3000;
    let distance = humanTime * speed;

    let input = {
        isOk: false,
        inputTime: 0,
        perfectTime: delay + 3000,
    };

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
            input.isOk = false;
            document.addEventListener('akaievent', eventListener);
        }
    }).then({
        y: {[targetY - distance]: targetY},
        duration: 500,
        delay: 0,
        easing: 'linear.none'
    }).then({
        radius: {[noteRadius]: 0},
        duration: 100,
        easing: 'cubic.out',
        onComplete: function () {
            callback(input);
            document.removeEventListener('akaievent', eventListener);
            this.el.remove();
        }
    });

    function eventListener(event) {
        const inputTime = Date.now() - Timer;
        console.log(event);
        if (event.detail === channel.key) {
            input.isOk = true;
            input.inputTime = inputTime;
        }
    }

    return result;
}
