import React from "react";
import Hero from "../assets/hero.svg";
import Waves from "../assets/waves.svg";
import { Link } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { auth } from "../services/firebase";

const Home = () => {
  return (
    <div className="w-full overflow-hidden flex justify-around bg-slate-50 items-center h-screen z-50">
      <div>
        <div className="line">
          <span className="text-7xl font-extrabold">The best platform</span>
        </div>
        <div className="line">
          <span className="text-7xl font-extrabold">to get hired by the</span>
        </div>
        <div className="line mb-10">
          <span className="text-7xl font-extrabold animate-gradient-x from-purple-400 via-primary-800 bg-gradient-to-r bg-clip-text text-transparent to-secondary-700">
            upcoming startups.
          </span>
        </div>
        <Link
          to="/signup"
          className="text-white uppercase hover:shadow-material hover:shadow-primary-400 transition-shadows duration-300 ease-in-out font-bold text-xl bg-primary-700 px-8 py-3 rounded-md"
        >
          <MdPeopleAlt className="mr-2 inline text-white" />
          Start Hiring
        </Link>
      </div>
      <img src={Hero} alt="Hero" className="w-128 h-128" />
      <img
        src={Waves}
        alt="Waves"
        className="absolute overflow-hidden  bottom-0 w-full z-0"
      />
    </div>
  );
};

export default Home;
