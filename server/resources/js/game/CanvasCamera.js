const SCROLL_SPEED = 1.2;
const CAM_SCROLL_SPEED = 1.05;
const CAM_MOVE_SPEED = 100;


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

        this.mouse = {
            startX: this.x,
            startY: this.y,
            camX: this.target.x,
            camY: this.target.y,
            active: false
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
            if (this.mouse.active) {
                let {x, y} = this.calcMouse(ev);

                let deltaX = x - this.mouse.startX;
                let deltaY = y - this.mouse.startY;

                this.moveTo({
                    x: this.mouse.camX - deltaX,
                    y: this.mouse.camY - deltaY,
                });

            }

        });

        this.cnv.addEventListener("mouseup", ev => {
            this.mouse.active = false;
            this.mouse.camX = this.target.x;
            this.mouse.camY = this.target.y;
        })

        this.cnv.addEventListener("wheel", ev => {
            let delta = delta = ev.deltaY || ev.detail || ev.wheelDelta;
            this.target.scale *= delta > 0 ? 1 / SCROLL_SPEED : SCROLL_SPEED;

        });
    }

    // Move camera to point
    moveTo ({x, y}) {
        this.target.x = x;
        this.target.y = y;

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
        this.ctx.fillStyle = "#00010f";
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    }

    // Handle events
    handle () {
        // Scaling
        if (this.scale < this.target.scale) {
            this.scale = Math.min(this.scale * CAM_SCROLL_SPEED, this.target.scale);
        } else if (this.scale > this.target.scale) {
            this.scale = Math.max(this.scale / CAM_SCROLL_SPEED, this.target.scale);
        }

        // Moving
        let vec = {x: this.target.x - this.x, y: this.target.y - this.y};
        let ln = (vec.x ** 2 + vec.y ** 2) ** 0.5;
        if (ln * this.scale > CAM_MOVE_SPEED) {
            
            vec.x /= ln;
            vec.y /= ln;
            this.x += vec.x * CAM_MOVE_SPEED / this.scale;
            this.y += vec.y * CAM_MOVE_SPEED / this.scale;
        } else {
            this.x = this.target.x;
            this.y = this.target.y;
        }
        // console.log(vec);
    }

    // Draw objects
    drawObject(obj) {
        let x = obj.x;
        let y = obj.y;

        let drawX = (x - this.x) * this.scale + this.cnv.width / 2;
        let drawY = (y - this.y) * this.scale + this.cnv.height / 2;
        let drawRad = obj.rad * this.scale;

        this.ctx.fillStyle = obj.color;
        this.ctx.beginPath();
        this.ctx.arc(drawX, drawY, drawRad, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    // Drawing additional graphics
    drawAdditionalGraphics() {
        this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        this.ctx.lineWidth = 3;

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