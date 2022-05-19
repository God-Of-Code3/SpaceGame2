import CanvasCamera from "./CanvasCamera";
import c from "./constants";
import DataControlManager from "./DataControlManager";
import DrawingObject from "./DrawingObject";
import PlanetObject from "./PlanetObject";
import SpaceObject from "./SpaceObject";
import StarObject from "./StarObject";



const startGame = (cnv, ctx, uiElements) => {
    const cam = new CanvasCamera({}, cnv, ctx);
    const dataControlManager = new DataControlManager(cam, uiElements);
    let obj = new StarObject({
        rad: 109*6 / c.AU_TO_TKM,
        temperature: 5.7,
        rotation: Math.PI / 3,
        name: "Солнце"
    }, 0, 0, null);
    obj.addChild({
            rad: 6 / c.AU_TO_TKM,
            color: "#1ac9ac",
            name: "Земля",
            image: "http://127.0.0.1:8000/storage/images/planets/alive-standart/planet4.png",
            rotation: Math.PI / 3,
            compositionType: 'rock'
        }, {
            dist: 1,
            angle:  (Math.PI / 6)
    }, PlanetObject);

    let obj2 = new StarObject({
        rad: 109*6*0.145 / c.AU_TO_TKM,
        temperature: 3.1,
        rotation: Math.PI / 3,
        name: "Проксима Центавра"
    }, 270000, 0, null);
    obj2.addChild({
            rad: 2 / c.AU_TO_TKM,
            color: "#1AAAC9",
            name: "Земля 2",
            image: "http://127.0.0.1:8000/storage/images/planets/alive-red/planet7.png",
            rotation: Math.PI * 0.02,
            compositionType: 'rock'
        }, {
            dist: 2,
            angle:  (0.4 * Math.PI)
    }, PlanetObject);
    

    const objects = [
        obj,
        obj2
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