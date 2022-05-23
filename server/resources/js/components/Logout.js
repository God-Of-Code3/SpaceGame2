import React from 'react';
import request from '../api/Request';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { authContext } from './App';

const Logout = () => {

    const nav = useNavigate();
    const {setAuth} = useContext(authContext);

    useEffect(() => {
        request("/api/logout", {}, r => {
            nav("/login");
            setAuth(0);

        }, "GET");
    }, []);

    return (
        <div>
            
        </div>
    );
};

export default Logout;