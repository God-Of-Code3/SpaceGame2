import c from "./constants";
import SpaceObject from "./SpaceObject";

class Colony extends SpaceObject {
    constructor(props={}, ...args) {
        super(props, ...args);

        this.objectType = 0;

        this.icon = new Image();
        this.icon.src = `http://127.0.0.1:8000/storage/images/icons/colony.svg`;
    }

    // Drawing
    draw(cam) {
        let {x, y, size} = cam.calcCoordsAndSize(this.x + Math.cos(this.props.angle) * this.props.dist, this.y + Math.sin(this.props.angle) * this.props.dist, this.props.rad);
        let [w, h] = [20, 20];

        cam.setShadow("rgba(20, 255, 280, 1)", {});
        cam.ctx.drawImage(this.icon, x - w / 2, y - c.COLONY_ICON_OFFSET - size, w, h);
    }
}

export default Colony;