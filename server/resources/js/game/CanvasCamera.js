import c from "./constants";


class CanvasCamera {
    constructor (props, cnv, ctx) {
        this.x = props.x || 0;
        this.y = props.y || 0;
        this.scale = props.scale || 1;
        this.mode = props.mode || 1; // 0 - galaxy scope, 1 - local stars scope, 2 - star system scope, 3 - planet scope

        this.cnv = cnv;
        this.ctx = ctx;

        this.addEvents();

        this.target = {
            x: this.x,
            y: this.y,
            scale: this.scale,
        };

        // Mouse for dragging
        this.mouse = {
            startX: this.x,
            startY: this.y,
            camX: this.target.x,
            camY: this.target.y,
            active: false
        };

        // Mouse coords
        this.mouseCoords = {
            x: this.x,
            y: this.y
        };

        // Mouse selecting and focusing
        this.actionObjects = {
            hover: null,
            focus: null
        }
    }

    // Set hover action object
    setHover(obj, value) {
        if (value)
            this.actionObjects.hover = obj;
        if (!value && this.actionObjects.hover == obj)
            this.actionObjects.hover = null;
    }

    // Set focus action object
    setFocus(obj) {
        if (obj == null && this.actionObjects.focus != null) {
            this.actionObjects.focus.setFocus(false);
        }
        this.actionObjects.focus = obj;
        if (obj != null) {
            obj.setFocus(true);
        }
    }


    // Adding events
    addEvents() {
        this.cnv.addEventListener("mousedown", ev => {
            let {x, y} = this.calcMouse(ev);

            this.mouse.active = true;
            this.mouse.startX = x;
            this.mouse.startY = y;

            this.mouse.camX = this.target.x;
            this.mouse.camY = this.target.y;
        });

        this.cnv.addEventListener("mousemove", ev => {
            let {x, y} = this.calcMouse(ev);
            if (this.mouse.active) {

                let deltaX = x - this.mouse.startX;
                let deltaY = y - this.mouse.startY;

                this.moveTo({
                    x: this.mouse.camX - deltaX,
                    y: this.mouse.camY - deltaY,
                });

            }
            this.mouseCoords.x = x;
            this.mouseCoords.y = y;

        });

        this.cnv.addEventListener("mouseup", ev => {
            this.mouse.active = false;
            this.mouse.camX = this.target.x;
            this.mouse.camY = this.target.y;
        });

        this.cnv.addEventListener("wheel", ev => {
            let delta = delta = ev.deltaY || ev.detail || ev.wheelDelta;
            this.target.scale *= delta > 0 ? 1 / c.SCROLL_SPEED : c.SCROLL_SPEED;

        });

        this.cnv.addEventListener("contextmenu", ev => {
            ev.preventDefault();
            if (this.actionObjects.hover) {
                
                this.moveTo({
                    x: this.actionObjects.hover.x,
                    y: this.actionObjects.hover.y,
                });

                if (this.actionObjects.hover != this.actionObjects.focus) {
                    this.setFocus(null);
                }
            }
            
        });

        this.cnv.addEventListener("dblclick", ev => {
            if (this.actionObjects.hover) {
                this.moveTo({
                    x: this.actionObjects.hover.x,
                    y: this.actionObjects.hover.y,
                });
                this.scaleTo(this.actionObjects.hover.scaleValue);
                this.setFocus(null);
                this.setFocus(this.actionObjects.hover);
            }
        });
    }

    // Move camera to point
    moveTo ({x, y}) {
        this.target.x = x;
        this.target.y = y;
        this.mouse.camX = x;
        this.mouse.camY = y;
    }

    // Scale camera to value
    scaleTo(value) {
        this.target.scale = value;
    }

    // Getting camera view size
    getViewSize() {
        return {
            width: this.cnv.width / this.scale,
            height: this.cnv.height / this.scale,
        };
    }

    // Calculate mouse position
    calcMouse (ev) {
        let x = ev.clientX - this.cnv.width / 2;
        let y = ev.clientY - this.cnv.height / 2;
        x /= this.scale;
        y /= this.scale;
        
        x += this.mouse.camX;
        y += this.mouse.camY;

        return {x, y};
    }

    // Filling background
    fill () {
        this.ctx.fillStyle = c.BG_COLOR;
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    }

    // Handle events
    handle () {

        // Scaling
        if (this.scale < this.target.scale) {
            this.scale = Math.min(this.scale * c.CAM_SCROLL_SPEED, this.target.scale);
        } else if (this.scale > this.target.scale) {
            this.scale = Math.max(this.scale / c.CAM_SCROLL_SPEED, this.target.scale);
        }

        // Moving
        let vec = {x: this.target.x - this.x, y: this.target.y - this.y};
        let ln = (vec.x ** 2 + vec.y ** 2) ** 0.5;
        if (ln * this.scale > c.CAM_MOVE_SPEED) {
            
            vec.x /= ln;
            vec.y /= ln;
            this.x += vec.x * c.CAM_MOVE_SPEED / this.scale;
            this.y += vec.y * c.CAM_MOVE_SPEED / this.scale;
        } else {
            this.x = this.target.x;
            this.y = this.target.y;
        }
    }

    // Draw objects
    drawObject(obj) {
        let x = obj.x;
        let y = obj.y;

        let drawX = (x - this.x) * this.scale + this.cnv.width / 2;
        let drawY = (y - this.y) * this.scale + this.cnv.height / 2;
        let drawRad = obj.rad * this.scale;
    }

    // Setting shadow
    setShadow(color, options) {
        this.ctx.shadowBlur = 0;
        if (options.shadow) {
            this.ctx.shadowColor = options.shadow.color || color;
            this.ctx.shadowBlur = options.shadow.blur || 10;
        }
    }

    // Setting stroke
    setStroke(options) {
        this.ctx.lineWidth = options.lineWidth;
        this.ctx.setLineDash(options.dash ? options.dash : []);
    }

    // Basic drawing circle method
    drawCircle(x, y, rad, color, options={}) {
        
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, rad, 0, Math.PI * 2);
        this.setShadow(color, options);

        if (options.stroke) {
            this.setStroke(options);
            this.ctx.stroke();
        } else {
            this.ctx.fill();
        }

        this.ctx.closePath();
    }

    // Basic drawing image
    drawImage(img, x, y, w, h, color, options={}) {
        this.setShadow(color, options);

        this.ctx.drawImage(img, x - w / 2, y - h / 2, w, h);
    }

    // Calc coords and size
    calcCoordsAndSize(x, y, size) {
        return {
            x: (x - this.x) * this.scale + this.cnv.width / 2,
            y: (y - this.y) * this.scale + this.cnv.height / 2,
            size: size * this.scale
        };
    }

    // Drawing additional graphics
    drawAdditionalGraphics() {
        this.ctx.shadowBlur = 0;
        this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        this.ctx.lineWidth = 3;
        this.ctx.setLineDash([]);

        let offset = 10;

        this.ctx.beginPath();
        this.ctx.moveTo(this.cnv.width / 2 - offset, this.cnv.height / 2);
        this.ctx.lineTo(this.cnv.width / 2 + offset, this.cnv.height / 2);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.moveTo(this.cnv.width / 2, this.cnv.height / 2 - offset);
        this.ctx.lineTo(this.cnv.width / 2, this.cnv.height / 2 + offset);
        
        this.ctx.stroke();
        this.ctx.closePath();
    }
}

export default CanvasCamera;