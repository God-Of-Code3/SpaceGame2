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

        // Data manager
        this.dataManager = null;

        // Bg stars
        this.bgStars = [];
        for (let i = 0; i < 200; i ++) {
            this.bgStars.push({
                x: c.RANDINT(-1000, 1000),
                y: c.RANDINT(-1000, 1000),
                z: c.RANDINT(0.5 / c.MIN_SCALE, c.BG_STARS_DIFF / c.MIN_SCALE),
            });
        }
    }

    // Set hover action object
    setHover(obj, value) {
        if (value)
            this.actionObjects.hover = obj;
        if (!value && this.actionObjects.hover == obj)
            this.actionObjects.hover = null;
    }

    // Set data manager
    setDataManager(manager) {
        this.dataManager = manager;
    }

    // Set focus action object
    setFocus(obj) {
        if (obj == null && this.actionObjects.focus != null) {
            this.actionObjects.focus.setFocus(false);
            
            this.dataManager.showFocusedObjectData(obj);
        }
        this.actionObjects.focus = obj;
        if (obj != null) {
            obj.setFocus(true);
            
            this.dataManager.showFocusedObjectData(obj);
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

            this.setFocus(null);
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
            
            this.target.scale = Math.max(this.target.scale, c.MIN_SCALE);

            console.log(this.target.scale);
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

                if(document.selection && document.selection.empty) {
                    document.selection.empty();
                } else if(window.getSelection) {
                    var sel = window.getSelection();
                    sel.removeAllRanges();
                }
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

    // Getting view area points
    checkObjectInView(x, y, size) {
        let dX = Math.abs(x - this.mouse.camX);
        let dY = Math.abs(y - this.mouse.camY);
        let {width, height} = this.getViewSize();

        return dX < (width / 2 + size) && dY < (height / 2 + size);
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
        

        this.drawBackgroundStars();
    }

    // Handle events
    handle () {

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
            // Scaling
            if (this.scale < this.target.scale) {
                this.scale = Math.min(this.scale * c.CAM_SCROLL_SPEED, this.target.scale);
            } else if (this.scale > this.target.scale) {
                this.scale = Math.max(this.scale / c.CAM_SCROLL_SPEED, this.target.scale);
            }
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
    drawImage(img, x, y, w, h, rotation, color, options={}) {
        this.setShadow(color, options);
        this.ctx.save();
        this.ctx.translate(x, y);
        this.ctx.rotate(rotation);

        this.ctx.drawImage(img,  - w / 2,  - h / 2, w, h);

        this.ctx.restore();
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
        this.ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        this.ctx.lineWidth = 1;
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

    // Draw background stars
    drawBackgroundStars() {
        this.bgStars.forEach(star => {
            let x = star.x;
            let y = star.y;
            x = (star.x - this.x / star.z) * Math.pow(this.scale, 1 / star.z);
            y = (star.y - this.y / star.z) * Math.pow(this.scale, 1 / star.z);
            this.drawCircle(x + this.cnv.width / 2, y + this.cnv.height / 2, (1 - star.z / (c.BG_STARS_DIFF / c.MIN_SCALE)) * 1 + 1, `rgba(255, 255, 255, ${(1 - star.z / (c.BG_STARS_DIFF / c.MIN_SCALE)) * 0.6})`, {shadow: {blur: 15}});
        });
    }
}

export default CanvasCamera;