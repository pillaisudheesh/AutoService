import React from "react";
import Hero from "../../components/Hero";

const Home = () => {
  return (
    <main className="font-Roboto relative min-h-screen overflow-x-hidden">
      <div className=" absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-pink-500/20 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Hero />
      </div>
    </main>
  );
};

export default Home;
