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
            
            this.uiElements.setSidebarData({
                title: c.OBJECT_TYPES[obj.objectType][1],
                sections: [
                    {
                        title: "Информация о звезде",
                        content: [
                            {
                                type: 'spaceObjectCard',
                                color: obj.props.color
                            }
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