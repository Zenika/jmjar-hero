(function () {

    function failure(x, y) {
        let swirl1 = new mojs.Shape({
            shape: 'circle',
            fill: 'transparent',
            className: 'troll',
            duration: 800,
            radius: noteRadius / 2
        }).tune({x, y}).play();
    }

    window.failure = failure;

}());