function string(channel) {

    let shape = new mojs.Shape({
        shape: 'rect',
        radius: 350,
        radiusX: 2,
        x: channel.x,
        fill: 'red',
        isShowStart: true,
        parent: harp, strokeWidth: 0,
        className: 'string',
        delay: 0,
        duration: 10,
    }).then({
        className: {'string': "white-string"},
        fill: {'red': 'white'},
        duration: 200,
        delay: 0,
        onStart: function () {
            this.el.classList.add("white-string")
        }
    }).then({
        className: {'white-string': "string"},
        fill: {'white': 'red'},
        duration: 200,
        delay: 0,
        onStart: function () {
            this.el.classList.remove("white-string")
        }
    });

    document.addEventListener('keydown', function () {
        if (event.key === channel.key) {
            shape.play();
        }
    });

}