import React, { useState, useEffect } from "react";
import { HiX, HiMenu } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import Cookies from 'js-cookie';

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("#home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user: userInfo } = useSelector((x) => x.auth);

  if(userInfo) {
    console.log('Navbar userinfo');
    console.log(userInfo);
  } else {
    console.log('Navbar');
  }

  useEffect(() => {
    // Simulate fetching user details 
    console.log('Navbar');
    checkIfAuthenticated();
  }, [userInfo.token]);

  const checkIfAuthenticated = () => {
    let authToken = Cookies.get('authToken');
    if (authToken || userInfo?.token) {
      console.log('here')
      setIsUserLoggedIn(true);
    } else {
      console.log('else here')
      setIsUserLoggedIn(false);
    }
  };

  const navLinks = [
    {
      href: "#home",
      label: "Home",
    },
    {
      href: "#about",
      label: "About Us",
    },
    {
      href: "#services",
      label: "Services",
    },
  ];
  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/home"); 
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/switch');
  }
  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove('authToken', { secure: true, sameSite: 'strict' });
    dispatch(authActions.clearToken());
    setIsUserLoggedIn(false);
    navigate('/switch');
  }
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100 shadow-sm">
      <div className="w-full container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        <div className="flex items-center gap-1 cursor-pointer" onClick={(e) => handleLogoClick(e)}>
          <div className="w-4 h-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"></div>
          <div className="w-4 h-4 bg-red-500 -ml-2 rounded-full opacity-100 hover:opacity-75 transition-opacity"></div>
          <div className=" text-2xl">
            <span className=" text-blue-600">auto</span>
            <span className="text-red-500">ASSIST</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setActiveLink(link.href)}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all ${
                activeLink === link.href
                  ? "text-blue-600 after:w-full"
                  : "text-gray-600 hover:text-gray-900    "
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <HiX className="size-6" />
          ) : (
            <HiMenu className="size-6" />
          )}  
        </button>
        {isUserLoggedIn ? <button className=" hidden md:block bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              <a onClick={handleSignOut}>Sign Out</a>
            </button>: <button className="hidden md:block bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-700 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              <a onClick={handleSignIn}>Login</a>
            </button>}
      </div>
      {/* mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4">
          <div className="container mx-auto px-4 space-y-3">
            {navLinks.map((link, index) => (
              <a
                className={`block text-sm font-medium py-2 ${
                  activeLink === link.href
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                key={index}
                href={link.href}
                onClick={() => {
                  setActiveLink(link.href);
                  setIsMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            ))}
            {isUserLoggedIn ? <button className="w-full bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-800 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              <a href="/switch">Sign Out</a>
            </button>: <button className="w-full bg-blue-600 px-6 py-2.5 rounded-lg hover:bg-blue-800 text-white text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100">
              <a href="/switch">Login</a>
            </button>}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
