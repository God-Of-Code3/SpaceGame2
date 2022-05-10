import React, { useEffect, useRef, useState } from 'react';
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

    return (
        <canvas ref={cnv} width={width} height={height}>

        </canvas>
    );
};

export default Canvas;