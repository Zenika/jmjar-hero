function target() {
    new mojs.Shape({
        shape: 'rect',
        fill: 'none',
        stroke: 'white',
        radiusX: noteRadius * 6 + 10,
        radiusY: noteRadius + 10,
        strokeWidth: 2,
        isShowStart: true,
        y: targetY + 10,
        x: 10
    });
}