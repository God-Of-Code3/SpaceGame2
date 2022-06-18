import { classToColor, temperatureToClass } from "./math/stars";
import SpaceObject from "./SpaceObject";
import DrawingObject from "./DrawingObject";
import c from "./constants";
import PlanetObject from "./PlanetObject";


class StarObject extends SpaceObject {
    constructor(props={}, ...args) {

        super(props, ...args);

        this.temperature = props.temperature; // 10^3 K
        this.luminosity = props.luminosity; // 10^x solar luminosity
        this.mass = props.mass; // solar mass

        this.starClass = temperatureToClass(this.temperature);
        this.props.color = classToColor(this.starClass);

        this.minRad = c.MIN_STAR_RAD;
        this.setDrawingObject();
        
        this.objectType = 1;

        this.createChildren(clss);
    }


    // Main information
    getMainInformation() {
        let info = super.getMainInformation();
        info.subtitle = 'Звезда класса ' + this.starClass;
        return info;
    }

    setDrawingObject() {
        this.drawingObject = new DrawingObject({
            x: this.x,
            y: this.y,
            rad: this.props.rad,
            minRad: this.minRad,
            color: this.props.color
        });
    }
}

const clss = {
    2: StarObject,
    3: PlanetObject
}

export default StarObject;