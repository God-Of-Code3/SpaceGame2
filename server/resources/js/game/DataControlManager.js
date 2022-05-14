import { useState } from "react";
import GameSidebar from "../components/game/GameSidebar";

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
                title: obj.props.color
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