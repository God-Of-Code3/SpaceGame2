class DrawingObject {
    constructor (props={}) {
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rad = props.rad || 20;
        this.rotation = props.rotation;
        this.minRad = props.minRad || 0;

        this.color = props.color || "rgba(255, 255, 255, 1)";
    }

    draw(cam) {
        let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, this.rad);
        size = Math.max(this.minRad, size);
        cam.drawCircle(x, y, size, this.color, {shadow: {blur: size * 2}});
    }
}


class ImageDrawingObject extends DrawingObject {
    constructor(props={}) {
        super(props);

        this.imageSrc = props.img;
        this.image = new Image();
        this.image.src = this.imageSrc;
    }

    draw(cam) {
        let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, this.rad * 2);
        size = Math.max(this.minRad, size);
        cam.drawImage(this.image, x, y, size, size, this.rotation, this.color, {shadow: {blur: size}});
    }
}


export { ImageDrawingObject };
export default DrawingObject;