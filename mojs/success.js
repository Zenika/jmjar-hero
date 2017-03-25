(function () {
    let SWIRL_OPTS = {
        fill: 'white',
        duration: 'rand(600, 800)',
        radius: 'rand(10, 20)',
        pathScale: 'rand(.5, 1)',
        swirlFrequency: 'rand(2,4)',
        swirlSize: 'rand(6,14)',
    };
    let SWIRL_OPTS1 = Object.assign({}, this.SWIRL_OPTS, {direction: -1});
    let swirl1 = new mojs.ShapeSwirl(SWIRL_OPTS);
    let swirl2 = new mojs.ShapeSwirl(SWIRL_OPTS1);
    let swirl3 = new mojs.ShapeSwirl(Object.assign({}, SWIRL_OPTS));
    let swirl4 = new mojs.ShapeSwirl(Object.assign({}, SWIRL_OPTS));

    function success(x, y) {
        swirl1
            .tune({x, y})
            .generate()
            .play();

        swirl2
            .tune({x, y})
            .generate()
            .replay();

        swirl3
            .tune({x, y})
            .generate()
            .replay();

        swirl4
            .tune({x, y})
            .generate()
            .replay();
    }

    window.success = success;
})();