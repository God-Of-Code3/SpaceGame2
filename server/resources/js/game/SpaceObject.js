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

        this.state = {
            hover: false,
            focus: false
        };

        // Value of camera scale that is needed to make object's size SPACE_OBJECT_SCOPE_SIZE
        this.scaleValue = c.SPACE_OBJECT_SCOPE_SIZE / this.props.rad;

        this.objectType = 0;

        this.name = this.props.name;
    }

    // Getting sidebar information
    getSidebar() {
        let mainSection = this.getSidebarMainSection();

        let sections = [mainSection, ...this.getSidebarAdditionalSections()];

        let sidebar = {
            title: this.getSidebarTitle(),
            sections: sections
        };

        return sidebar;
    }

    // Getting sidebar title
    getSidebarTitle() {
        return c.OBJECT_TYPES[this.objectType][1];
    }

    // Getting sidebar main section
    getSidebarMainSection() {
        let mainInformation = this.getMainInformation();
        return {
            title: "Основная информация",
            content: [
                mainInformation
            ]
        }
    }

    // Get sidebar additional sections
    getSidebarAdditionalSections() {
        let sections = [];
        if (this.children.length > 0) {
            let section = {
                title: "Система",
                content: []
            };

            this.children.forEach(child => {
                let mainInformation = child.getMainInformation();

                section.content.push(mainInformation);
            });
            
            sections.push(section);
        }
        return sections;
    }

    // Main information
    getMainInformation() {
        return {
            color: this.props.color,
            title: this.name,
            type: 'spaceObjectCard'
        }
    }

    // Setting focus
    setFocus(value) {
        this.state.focus = value;
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
            rad: this.props.rad * 2,
            color: this.props.color,
            img: './storage/images/planets/alive-standart/planet.png'
        });
    }

    // Drawing
    draw(cam) {
        this.drawingObject.x = this.x;
        this.drawingObject.y = this.y;
        this.drawingObject.draw(cam);

        // Drawing hover circle
        if (this.state.hover) {
            let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, this.props.rad);
            cam.drawCircle(x, y, size + c.HOVER_OFFSET, c.HOVER_COLOR, {
                stroke: true,
                lineWidth: c.HOVER_LINE_WIDTH
            });
        }

        // Drawing focus circle
        if (this.state.focus) {
            let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, this.props.rad);
            cam.drawCircle(x, y, size + c.FOCUS_OFFSET, c.FOCUS_COLOR, {
                stroke: true,
                dash: [4, 22],
                lineWidth: c.FOCUS_LINE_WIDTH
            });
        }

        this.children.forEach(child => {
            let dist = child.relations.dist;

            let {x, y, size} = cam.calcCoordsAndSize(this.x, this.y, dist);
            cam.drawCircle(x, y, size, c.ORBIT_COLOR, {
                stroke: true,
                lineWidth: c.ORBIT_LINE_WIDTH
            });

            child.draw(cam);
        });

    }

    // Handling
    handle(cam) {
        let d = (this.x - cam.mouseCoords.x) ** 2 + (this.y - cam.mouseCoords.y) ** 2;
        if (d < this.props.rad ** 2) {
            this.state.hover = true;
            cam.setHover(this, true);
        } else {
            this.state.hover = false;
            cam.setHover(this, false);
        }

        this.children.forEach(child => child.handle(cam));
    }

    // Adding child
    addChild(props={}, relations={}, cls=SpaceObject) {
        new cls(props, 0, 0, this, relations);
        
    }
}

export default SpaceObject;