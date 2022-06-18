import SpaceObject from "./SpaceObject";
import {ImageDrawingObject} from "./DrawingObject";
import { compTypeToText } from "./math/planets";
import c from "./constants";



class PlanetObject extends SpaceObject {
    constructor(props={}, ...args) {

        super(props, ...args);

        this.temperature = props.temperature; // 10^3 K
        this.mass = props.mass; // earth mass
        this.compositionType = props.compositionType; // Composition type (ice, rock and gase) 


        this.props.image = props.image;
        this.minRad = c.MIN_PLANET_RAD;

        this.setDrawingObject();

        this.objectType = 2;

        this.createChildren(clss);
    }

    // Main information
    getMainInformation() {
        let info = super.getMainInformation();
        info.image = this.props.image;
        info.subtitle = compTypeToText(this.compositionType, this.temperature, this.mass) + ' планета';
        return info;
    }

    // Image drawing object instead of standart drawing object
    setDrawingObject() {
        this.drawingObject = new ImageDrawingObject({
            x: this.x,
            y: this.y,
            rad: this.props.rad,
            color: this.props.color,
            img: this.props.image,
            minRad: this.minRad,
            rotation: this.props.rotation,
        });
    }

    handle(cam) {
        if (this.render) {
            super.handle(cam);
        }
        this.render = cam.scale > 0.05;
    }
}

const clss = {
    3: PlanetObject
}

export default PlanetObject;