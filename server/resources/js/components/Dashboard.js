import React, { useContext, useEffect, useState } from 'react';
import UIConstructor from './ui/UIConstructor';
import request from '../api/Request';
import Container from './Container';

const reloadContext = React.createContext({});

const Dashboard = () => {
    const [elements, setElements] = useState([]);
    const [title, setTitle] = useState("");

    const reload = () => {
        request('/api/game/get_dashboard', {}, r => {
            setElements(r.content.children);
            setTitle(r.content.title);
        }, "GET");
    }

    useEffect(() => {
        reload();
    }, []);

    return (
        <Container>
            <reloadContext.Provider value={{reload}}>
                <UIConstructor title={title} elements={elements}></UIConstructor>
            </reloadContext.Provider>  
            
        </Container>
    );
};

export default Dashboard;
export {reloadContext};