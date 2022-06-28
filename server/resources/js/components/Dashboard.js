import React, { useContext, useEffect, useState } from 'react';
import UIConstructor from './ui/UIConstructor';
import request from '../api/Request';
import Container from './Container';

const reloadContext = React.createContext({});

const Dashboard = () => {
    

    return (
        <Container>
                <UIConstructor ttl={"Рабочая панель"} elements={[]} api={`api/game/get_dashboard`}></UIConstructor>
        </Container>
    );
};

export default Dashboard;
export {reloadContext};