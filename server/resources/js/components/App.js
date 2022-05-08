import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Contacts from './Contacts';
import NavBar from './NavBar';
import Welcome from './Welcome';

function App() {
    return (
        <BrowserRouter>
            <NavBar></NavBar>
            <Routes>
                <Route path="/" element={<Welcome/>}></Route>
                <Route path="/contacts" element={<Contacts/>}></Route>
            </Routes>
            
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
