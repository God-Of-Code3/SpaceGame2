import React, { createContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import NavBar from './NavBar';
import AppRouter from './AppRouter';
import {ReactSession} from 'react-client-session';
import checkAuth from '../api/CheckAuth';


ReactSession.setStoreType("sessionStorage");

const authContext = createContext();

function App() {
    const [auth, setAuth] = useState(0);

    useEffect(() => {
        checkAuth(setAuth);
    }, []);

    return (
        <authContext.Provider value={{auth, setAuth}}>
            <BrowserRouter>
                <NavBar auth={auth}></NavBar>
                <AppRouter auth={auth}></AppRouter>
            </BrowserRouter>
        </authContext.Provider>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}


export {authContext};