import React, { useState } from "react";
import "./styles/index.css";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

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
                <Header
                    toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                    toggleSidebar={toggleSidebar}
                />
                <Sidebar isSidebarOpen={isSidebarOpen} />
            </div>
        </>
    );
};

export default App;
