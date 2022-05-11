import CanvasCamera from "./CanvasCamera";
import DrawingObject from "./DrawingObject";
import SpaceObject from "./SpaceObject";
import StarObject from "./StarObject";



const startGame = (cnv, ctx) => {
    const cam = new CanvasCamera({}, cnv, ctx);
    let obj = new StarObject({
        rad: 20,
        temperature: 5.7,
    }, 0, 0, null);
    for (let i = 0; i < 180; i ++) {
        obj.addChild({
                rad: 10,
                color: "#1ac9ac",
            }, {
                dist: 100 + i * 10,
                angle:  i * 2 * (Math.PI / 180)
        });
    }
    

    const objects = [
        obj,
    ];


    const gameLoop = () => {

        // Main loop
        // console.log(objects);
        cam.fill();
        cam.handle();
        objects.forEach(obj => {
            
            obj.draw(cam);
        })
        cam.drawAdditionalGraphics();
        // End main loop

        requestAnimationFrame(gameLoop);
    }
    gameLoop();
}

export default startGame;