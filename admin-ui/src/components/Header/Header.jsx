import React from "react";
import { FaMoon, FaSun, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdSpaceDashboard } from "react-icons/md";

const Header = ({ darkMode, toggleDarkMode, toggleSidebar }) => {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            onClick={toggleSidebar}
                            className="focus: inline-flex items-center rounded-lg p-2 text-sm text-gray-500 ring-gray-200 hover:bg-gray-100 focus:ring-2 focus:outline-none sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        >
                            <HiOutlineMenuAlt2 className="text-2xl" />
                        </button>
                        <a href="#" className="ms-2 flex md:me-24">
                            <MdSpaceDashboard className="me-3 h-8 text-xl text-violet-500" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap sm:text-2xl dark:text-white">
                                autoAssist Dashboard
                            </span>
                        </a>
                    </div>
                    <div className="flex items-center justify-start rtl:justify-end">
                        <div className="pl-2">
                            <button
                                className="rounded-full p-2 dark:bg-slate-50 dark:text-slate-700"
                                onClick={toggleDarkMode}
                            >
                                {darkMode ? <FaSun /> : <FaMoon />}
                            </button>
                        </div>
                        <div className="pl-2">
                            <button className="rounded-full p-2 dark:bg-slate-50 dark:text-slate-700">
                                <FaUser />
                            </button>
                        </div>
                        <div className="hidden text-sm sm:block dark:text-white">
                            Welcome User
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
