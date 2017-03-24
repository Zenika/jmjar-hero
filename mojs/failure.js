(function () {

    let SWIRL_OPTS = {
        shape: 'circle',
        fill: 'black',
        duration: 800,
        radius: noteRadius / 4,
        onUpdate: function (progress) {
            var bounceProgress = mojs.easing.bounce.out(progress);
            this.el.style.transform = 'translateY(' + 200 * bounceProgress + 'px)';
        }
    };

    let swirl1 = new mojs.Shape(Object.assign({}, SWIRL_OPTS));
    let swirl2 = new mojs.Shape(Object.assign({}, SWIRL_OPTS));
    let swirl3 = new mojs.Shape(Object.assign({}, SWIRL_OPTS));
    let swirl4 = new mojs.Shape(Object.assign({}, SWIRL_OPTS));

    function failure(x, y) {
        swirl1
            .tune({x, y})
            .play();

        swirl2
            .tune({x, y})
            .replay();

        swirl3
            .tune({x, y})
            .replay();

        swirl4
            .tune({x, y})
            .replay();
    }

    window.failure = failure;
}());