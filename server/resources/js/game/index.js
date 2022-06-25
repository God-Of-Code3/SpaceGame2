import getSystems from "../api/game/getSystems";
import CanvasCamera from "./CanvasCamera";
import c from "./constants";
import DataControlManager from "./DataControlManager";
import DrawingObject from "./DrawingObject";
import PlanetObject from "./PlanetObject";
import SpaceObject from "./SpaceObject";
import StarObject from "./StarObject";
import clss from "./ClassesList";
import Colony from "./Colony";


const startGame = (cnv, ctx, uiElements, systems={objects: [], types: {}, camera: {}, colonies: {}},) => {

    const cam = new CanvasCamera(systems.camera, cnv, ctx);
    const dataControlManager = new DataControlManager(cam, uiElements);

    const objects = systems.objects.map(system => {
        const cls = clss[system.space_object_type_id];
        
        const obj = new cls(system, system.x, system.y, null);
        return obj;
    });

    const colonies = systems.colonies.map(colony => {
        const col = new Colony(colony, colony.x, colony.y, null);

        return col;
    })

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
        colonies.forEach(colony => {

            colony.handle(cam);
            colony.draw(cam);
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