function string(x) {
    new mojs.Shape({
        shape: 'rect',
        radius: 350,
        radiusX: 2,
        x: x + 3,
        fill: '#82162B',
        isShowStart: true
    });
    new mojs.Shape({
        shape: 'rect',
        radius: 350,
        radiusX: 2,
        x: x,
        fill: 'white',
        isShowStart: true
    });
}