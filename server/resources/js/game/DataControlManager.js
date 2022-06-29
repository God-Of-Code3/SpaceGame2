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
            let sidebar = obj.getSidebar();
            this.uiElements.setSidebarData(sidebar);
        } else {
            this.uiElements.setSidebarData({});
        }
    }

    // Opening modal by spaceObjectCard button
    setModalApi(api) {
        this.uiElements.setModalApi(api);
    }

    getSidebars() {
        return this.sidebars;
    }
}

export default DataControlManager;