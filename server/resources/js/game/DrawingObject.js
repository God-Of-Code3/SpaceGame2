class DrawingObject {
    constructor (props={}) {
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.rad = props.rad || 20;

        this.color = props.color || "rgba(255, 255, 0, 1)";
    }


}

export default DrawingObject;