import CanvasCamera from "./CanvasCamera";
import DataControlManager from "./DataControlManager";
import DrawingObject from "./DrawingObject";
import PlanetObject from "./PlanetObject";
import SpaceObject from "./SpaceObject";
import StarObject from "./StarObject";



const startGame = (cnv, ctx, uiElements) => {
    const cam = new CanvasCamera({}, cnv, ctx);
    const dataControlManager = new DataControlManager(cam, uiElements);
    let obj = new StarObject({
        rad: 40,
        temperature: 5.7,
    }, 0, 0, null);
    obj.addChild({
            rad: 10,
            color: "#1ac9ac",
            image: "http://127.0.0.1:8000/storage/images/planets/alive-standart/planet4.png"
        }, {
            dist: 200,
            angle:  (Math.PI / 6)
    }, PlanetObject);
    

    const objects = [
        obj,
    ];


    const gameLoop = () => {

        // Main loop
        // console.log(objects);
        cam.fill();
        cam.handle();
        objects.forEach(obj => {
            
            obj.handle(cam);
            obj.draw(cam);
        })
        cam.drawAdditionalGraphics();
        // End main loop

        requestAnimationFrame(gameLoop);
    }
    gameLoop();

    return dataControlManager;
}

export default startGame;