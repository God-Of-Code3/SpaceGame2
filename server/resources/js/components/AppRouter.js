import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { routes } from '../router';

const AppRouter = ({auth, ...props}) => {
    
    return (
        <Routes>
            {
                routes[auth].map((r, i) => 
                    <Route key={i} path={r.path} element={<r.element/>}></Route>
                )
            }
        </Routes>
    );
};

export default AppRouter;