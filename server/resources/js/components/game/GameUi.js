import React, { useEffect } from 'react';
import GameSidebar from './GameSidebar';
import GameModal from './GameModal';

const dataManagerContext = React.createContext({});

const GameUi = ({dataManager, sidebarData, modalApi, ...props}) => {
    
    return (
        <div>
            <dataManagerContext.Provider value={dataManager}>
                <GameSidebar sidebarData={sidebarData}></GameSidebar>
                <GameModal modalApi={modalApi}></GameModal>
            </dataManagerContext.Provider>
        </div>
    );
};

export default GameUi;
export {dataManagerContext};