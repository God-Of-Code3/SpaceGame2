import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import NavBar from './NavBar';
import AppRouter from './AppRouter';

function App() {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <AppRouter></AppRouter>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
