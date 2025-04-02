import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./styles/index.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./ui/Dashboard";

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            <div className={`${darkMode && "dark"} font-quickSand`}>
                <BrowserRouter>
                    <Header
                        toggleDarkMode={toggleDarkMode}
                        darkMode={darkMode}
                        toggleSidebar={toggleSidebar}
                    />
                    <Sidebar isSidebarOpen={isSidebarOpen} />
                    <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

export default App;
