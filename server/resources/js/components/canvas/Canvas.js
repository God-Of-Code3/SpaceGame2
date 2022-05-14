import React, { useEffect, useRef, useState } from 'react';
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
    const [dataManager, setDataManager] = useState(null);

    // Starting game
    useEffect(() => {

        setDataManager(startGame(cnv.current, ctx, {
            setSidebarData: setSidebarData
        }));
        
    }, [cnv, ctx]);

    return (
        <div className="area">
            <GameUi dataManager={dataManager} sidebarData={sidebarData}></GameUi>
            <canvas ref={cnv} width={width} height={height}>

            </canvas>
        </div>
    );
};

export default Canvas;