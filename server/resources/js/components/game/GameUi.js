import React, { useEffect } from 'react';
import GameSidebar from './GameSidebar';
import GameModal from './GameModal';

const GameUi = ({dataManager, sidebarData, ...props}) => {
    
    return (
        <div>
            <GameSidebar sidebarData={sidebarData}></GameSidebar>
            <GameModal getModalApi={''}></GameModal>
        </div>
    );
};

export default GameUi;