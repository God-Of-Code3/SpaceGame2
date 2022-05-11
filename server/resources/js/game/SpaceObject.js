import c from "./constants";
import DrawingObject, { ImageDrawingObject } from "./DrawingObject";

class SpaceObject {
    constructor (props={}, x, y, parent, relations={}) {
        this.x = x;
        this.y = y;
        this.props = props;
        
        this.parent = parent;
        this.children = [];

        this.relations = relations;
        this.calcCoords();

        this.drawingObject = null;
        this.setDrawingObject();
        
        this.addToParent();
    }

    // Calculating coords by relations
    calcCoords() {
        if (this.checkRelations()) {
            let dist = this.relations.dist;
            let angle = this.relations.angle;

            let x = this.parent.x + Math.cos(angle) * dist;
            let y = this.parent.y + Math.sin(angle) * dist;

            this.x = x;
            this.y = y;
        }
    }

    // Checking relations
    checkRelations() {
        return Object.keys(this.relations) != 0;
    }

    // Adding this object to parent children array
    addToParent() {
        if (this.parent) {
            this.parent.children.push(this);
        }
    }

    // Setting drawing object
    setDrawingObject() {
        this.drawingObject = new ImageDrawingObject({
            x: this.x,
            y: this.y,
            rad: this.props.rad,
            color: this.props.color,
            img: './storage/images/planets/alive-standart/planet.png'
        });
    }

    // Drawing
    draw(cam) {
        this.drawingObject.x = this.x;
        this.drawingObject.y = this.y;
        this.drawingObject.draw(cam);
        this.children.forEach(child => {
            let dist = child.relations.dist;

            let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, dist);
            cam.drawCircle(x, y, size, c.ORBIT_COLOR, {
                stroke: true,
                lineWidth: c.ORBIT_LINE_WIDTH
            });

            child.draw(cam);
        });

        if (this.checkRelations()) {
            this.relations.angle += 0.001;
            this.calcCoords();
        }
    }

    // Adding child
    addChild(props={}, relations={}) {
        new SpaceObject(props, 0, 0, this, relations);
        
    }
}

export default SpaceObject;