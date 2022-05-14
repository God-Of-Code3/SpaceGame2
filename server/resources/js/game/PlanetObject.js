import SpaceObject from "./SpaceObject";
import {ImageDrawingObject} from "./DrawingObject";



class PlanetObject extends SpaceObject {
    constructor(props={}, ...args) {

        super(props, ...args);

        this.temperature = props.temperature; // 10^3 K
        this.mass = props.mass; // solar mass
        this.compositionType = props.compositionType; // Composition type (ice, rock and gase) 


        this.props.image = props.image;
        this.setDrawingObject();
    }

    setDrawingObject() {
        this.drawingObject = new ImageDrawingObject({
            x: this.x,
            y: this.y,
            rad: this.props.rad,
            color: this.props.color,
            img: this.props.image
        });
    }
}



export default PlanetObject;