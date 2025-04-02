import React from "react";
import "./styles/index.css";
import NavBar from "./components/NavBar";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./features/Login/Login";
import UserRegistration from "./features/UserRegistration/UserRegistration";
import SwitchPage from "./features/Login/SwitchPage";
import ServiceProviderRegistration from "./features/ServiceProviderRegistration/ServiceProviderRegistration";
import ServiceProviderSelection from "./features/ServiceProvider/ServiceProviderSelection";
import DisplayInMap from "./features/ServiceProvider/DisplayInMap";
import Home from "./features/Home/Home";
import ServiceBooking from "./features/ServiceProvider/ServiceBooking";
const App = () => {
  return (
   <>
        <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<UserRegistration />}></Route>
          <Route path="/switch" element={<SwitchPage />}></Route>
          <Route path="/serviceproviderregister" element={<ServiceProviderRegistration />}></Route>
          <Route path="/serviceproviderselection" element={<ServiceProviderSelection />}></Route>
          <Route path="/map" element={<DisplayInMap />}></Route>
          <Route path="/bookservice" element={<ServiceBooking />}></Route>
        
        </Routes>
      </BrowserRouter>
      </>
  )
};

export default App;
