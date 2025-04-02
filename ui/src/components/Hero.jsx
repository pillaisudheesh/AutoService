import React from "react";
import { AiFillStar } from "react-icons/ai";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaTools } from "react-icons/fa";
import { MdOutlineCarRepair } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import assets from "../common/assets";

const Hero = () => {
    const navigate = useNavigate();
    const handleServiceProvider = (e) => {
        e.preventDefault();
        navigate('/serviceproviderregister');
    }
    const handleService = (e) => {
        e.preventDefault();
        navigate('/login');
    }
  return (
    <section className="container flex flex-col md:flex-row justify-between items-center mx-auto pt-44 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full md:w-1/2  space-y-8">
        <div className="flex items-center gap-2 bg-gray-50 w-fit px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group">
          <span>
            <AiFillStar className="text-blue-600 hover:text-amber-300 group-hover:scale-110 transition-transform" />
          </span>
          <span className="text-sm font-medium">Jump Start</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          <span>A Partnership that we have </span>
          <span className="text-blue-600 relative inline-block">
            Built on Trust
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-200/60 "></span>
          </span>
          <span>
            {" "}
            <br />
            and Proven Results.
          </span>
          <span className="inline-block ml-2 animate-pulse">
            <VscWorkspaceTrusted />
          </span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-xl">
          Compare, book, and save on auto service and repairs. Find trusted
          mechanics near you with our easy-to-use online aggregator. Your
          vehicle's care, simplified.
        </p>
        <div className="flex flex-col md:flex-row items-center space-x-4 space-y-4 md:space-y-0">
          <button
           onClick={(e) => {handleService(e)}}
            type="button"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            <FaTools className="inline-block mr-2" />I need service
          </button>
          <button
            onClick={(e) => {handleServiceProvider(e)}}
            type="button"
            className="px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-100 focus:outline-none"
          >
            <MdOutlineCarRepair  className="inline-block mr-2"/> Register as a service provider
          </button>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12">
      <div className="relative hidden md:block">
      <img src={assets.heroAuto} className=" rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"/>
      </div>
      
      </div>
    </section>
  );
};

export default Hero;
