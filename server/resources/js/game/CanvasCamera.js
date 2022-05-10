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
            scale: this.scale
        };
    }
    // Adding events
    addEvents() {
        this.cnv.addEventListener("mousedown", () => {

        });
    }

    // Move camera to point
    moveTo ({x, y}) {
        this.x = x;
        this.y = y;

    }

    // Calculate mouse position
    calcMouse (ev) {
        let x = ev.clientX - this.cnv.width / 2;
        let y = ev.clientY - this.cnv.height / 2;
        x /= this.scale;
        y /= this.scale;
        
        x += this.x;
        y += this.y;
    }

    // Filling background
    fill () {
        this.ctx.fillStyle = "#00010f";
        this.ctx.fillRect(0, 0, this.cnv.width, this.cnv.height);
    }

    // Handle events
    handle () {
        
    }

    // Draw objects
    drawObject(obj) {
        let x = obj.x;
        let y = obj.y;

        let drawX = (x - this.x) * this.scale + this.cnv.width / 2;
        let drawY = (y - this.y) * this.scale + this.cnv.height / 2;

        this.ctx.fillStyle = obj.color;
        this.ctx.beginPath();
        this.ctx.arc(drawX, drawY, obj.rad, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    
}

export default CanvasCamera;