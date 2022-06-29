import React from 'react';
import els from './Element';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
import request from '../../api/Request';

const reloadContext = React.createContext({});

const UIConstructor = ({api, ...props}) => {

    const [elements, setElements] = useState(props.elements);
    const [title, setTitle] = useState(props.title);

    const reload = () => {
        request(api, {}, r => {
            setElements(r.content.children);
            setTitle(r.content.title);
        }, "GET");
    }

    useEffect(() => {
        reload();
    }, [api]);

    return (
        <reloadContext.Provider value={{reload}}>
            <div className="">
                <h1 className='mb-5'>{title}</h1>
                {
                    elements.map(ch => 
                        els[ch.element]({el: ch})   
                    )
                }
            </div>    
        </reloadContext.Provider>
        
    );
};

export default UIConstructor;