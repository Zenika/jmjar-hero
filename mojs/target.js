function target() {
    new mojs.Shape({
        shape: 'rect',
        fill: 'none',
        stroke: '#82162B',
        radiusX: noteRadius * 6 + 10,
        radiusY: noteRadius + 10,
        strokeWidth: 3,
        isShowStart: true,
        y: targetY + 10 + 2,
        x: 10 + 2
    });
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