function target() {
    new mojs.Shape({
        shape: 'rect',
        fill: 'none',
        className: 'target',
        stroke: 'red',
        radiusX: noteRadius * 6 + 10,
        radiusY: noteRadius + 10,
        strokeWidth: 2,
        isShowStart: true,
        y: targetY - 30,
        x: 10,
        parent: harp
    });
}
