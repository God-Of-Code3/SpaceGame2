import CanvasCamera from "./CanvasCamera";
import DrawingObject from "./DrawingObject";



const startGame = (cnv, ctx) => {
    const cam = new CanvasCamera({}, cnv, ctx);
    const objects = [
        new DrawingObject(),
        new DrawingObject({x: 100, y: 100}),
    ];


    const gameLoop = () => {

        // Main loop
        // console.log(objects);
        cam.fill();
        objects.forEach(obj => {
            
            cam.drawObject(obj);
        })
        // End main loop

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

export default startGame;