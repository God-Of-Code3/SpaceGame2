import getSystems from "../api/game/getSystems";
import CanvasCamera from "./CanvasCamera";
import c from "./constants";
import DataControlManager from "./DataControlManager";
import DrawingObject from "./DrawingObject";
import PlanetObject from "./PlanetObject";
import SpaceObject from "./SpaceObject";
import StarObject from "./StarObject";
import clss from "./ClassesList";


const startGame = (cnv, ctx, uiElements, systems={objects: [], types: {}, camera: {}, civilization: {}},) => {

    const cam = new CanvasCamera(systems.camera, cnv, ctx);
    const dataControlManager = new DataControlManager(cam, uiElements);

    const objects = systems.objects.map(system => {
        const cls = clss[system.space_object_type_id];
        
        const obj = new cls(system, system.x, system.y, null);
        return obj;
    });

    let updateTime = performance.now();

    const update = () => {
        cam.updateCameraData();
    }

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

        // Updating
        if (performance.now() - updateTime > c.UPDATE_TIME_PERIOD) {
            update();
            updateTime = performance.now();
        }
        // End updating

        requestAnimationFrame(gameLoop);
    }

    gameLoop();

    return dataControlManager;
}

export default startGame;