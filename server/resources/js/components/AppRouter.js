import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { routes } from '../router';

const AppRouter = () => {
    return (
        <Routes>
            {
                routes.map((r, i) => 
                    <Route key={i} path={r.path} element={<r.element/>}></Route>
                )
            }
        </Routes>
    );
};

export default AppRouter;