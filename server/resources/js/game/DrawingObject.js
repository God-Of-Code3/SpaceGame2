class DrawingObject {
    constructor (props={}) {
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rad = props.rad || 20;

        this.color = props.color || "rgba(255, 255, 255, 1)";
    }

    draw(cam) {
        let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, this.rad);
        cam.drawCircle(x, y, size, this.color);
    }
}

export default DrawingObject;