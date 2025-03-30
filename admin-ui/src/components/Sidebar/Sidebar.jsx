import React from "react";

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <aside
            className={`sm:fixed top-0 left-0 z-40 h-screen w-64 sm:translate-x-0 
                border-r border-gray-200 bg-white pt-20
                 dark:border-gray-700 dark:bg-gray-800 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="h-full px-3 pb-4 overflow-y-auto">
                <ul className=""></ul>
            </div>
        </aside>
    );
};

export default Sidebar;
