(function () {

    function failure(x, y) {
        let swirl1 = new mojs.Shape({
            shape: 'circle',
            fill: 'transparent',
            className: 'troll',
            duration: 800,
            radius: noteRadius / 2,
            onUpdate: function (progress) {
                var bounceProgress = mojs.easing.bounce.out(progress);
                this.el.style.transform = 'translateY(' + 200 * bounceProgress + 'px)';
            },
        }).tune({x, y}).play();
    }

    window.failure = failure;

}());