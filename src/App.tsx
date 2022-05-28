import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages";
import 'antd/dist/antd.css';

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<h1>默认</h1>} />
            <Route path={"/home/*"} element={<Home />} />
        </Routes>
    </BrowserRouter>
}

export default App;
