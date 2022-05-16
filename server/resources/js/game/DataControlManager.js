import { useState } from "react";
import GameSidebar from "../components/game/GameSidebar";
import c from "./constants";

class DataControlManager {
    constructor(cam, uiElements) {
        this.cam = cam;
        this.cam.dataManager = this;

        this.uiElements = uiElements;

    }

    // Showing focused object
    showFocusedObjectData(obj) {
        if (obj) {
            let mainInformation = obj.getMainInformation();
            mainInformation.type = 'spaceObjectCard'


            this.uiElements.setSidebarData({
                title: c.OBJECT_TYPES[obj.objectType][1],
                sections: [
                    {
                        title: "Основная информация",
                        content: [
                            mainInformation
                        ]
                    }
                ]
            });
        } else {
            this.uiElements.setSidebarData({});
        }
    }

    getSidebars() {
        return this.sidebars;
    }
}

export default DataControlManager;