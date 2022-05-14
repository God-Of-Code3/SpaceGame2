import React, { useEffect } from 'react';
import GameSidebar from './GameSidebar';

const GameUi = ({dataManager, sidebarData, ...props}) => {
    
    return (
        <div>
            <GameSidebar sidebarData={sidebarData}></GameSidebar>
        </div>
    );
};

export default GameUi;