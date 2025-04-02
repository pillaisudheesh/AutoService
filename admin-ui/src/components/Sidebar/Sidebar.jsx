import React from "react";
import { FaHome, FaTools, FaUserCog, FaChartBar, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen }) => {
    return (
        <aside
            className={`top-0 left-0 z-40 h-screen w-64 border-r border-gray-200 bg-white pt-20 transition-transform sm:fixed sm:translate-x-0 dark:border-gray-700 dark:bg-gray-800 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
            <div className="h-full overflow-y-auto px-3 pb-4">
               <ul className="space-y-2 font-medium">
                <li>
                    <a href="/" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaHome className="mr-2" />
                        <span className="flex-1 me-3">Dashboard</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaTools className="mr-2" />
                        <span className="flex-1 me-3">Manage Services</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaUserCog className="mr-2" />
                        <span className="flex-1 me-3">User Management</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaChartBar className="mr-2" />
                        <span className="flex-1 me-3">Analytics</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="flex items-center p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <FaSignOutAlt className="mr-2" />
                        <span className="flex-1 me-3 text-red-500">Logout</span>
                    </a>
                </li>
               </ul>
               
            </div>
        </aside>
    );
};

export default Sidebar;
