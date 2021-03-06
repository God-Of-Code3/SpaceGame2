import React, { useEffect, useRef, useState } from 'react';
import getSystems from '../../api/game/getSystems';
import startGame from '../../game';
import GameUi from '../game/GameUi';
import './Canvas.css';

const Canvas = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const cnv = useRef(null);
    let ctx = null;
    
    useEffect(() => {
        ctx = cnv.current.getContext("2d");
    }, []);

    window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    });

    const [sidebarData, setSidebarData] = useState({});
    const [modalApi, setModalApi] = useState("");
    const [dataManager, setDataManager] = useState(null);

    // Starting game
    useEffect(() => {

        getSystems({setSystems: systems => {
            setDataManager(startGame(cnv.current, ctx, {
                setSidebarData: setSidebarData,
                setModalApi: setModalApi,
            },
            systems
            ));
        }});
        
        
    }, [cnv, ctx]);

    return (
        <div className="area">
            <GameUi dataManager={dataManager} sidebarData={sidebarData} modalApi={modalApi}></GameUi>
            <canvas ref={cnv} width={width} height={height}>

            </canvas>
        </div>
    );
};

export default Canvas;