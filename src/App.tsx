import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages";
import 'antd/dist/antd.css';
import {Root} from "./pages/root/Root";

function App() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Root />} />
            <Route path={"/home/*"} element={<Home />} />
        </Routes>
    </BrowserRouter>
}

export default App;
