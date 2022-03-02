import React from "react";
import Waves from "../assets/waves.svg";
import candidate from "../assets/candidate.svg";
import recruiter from "../assets/recruiter2.svg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div id="blurry-gradient"></div>
      <div id="blurry-gradient2"></div>
      <div className="w-full flex justify-center flex-col bg-slate-50 items-center h-screen">
        <h1 className="z-30 text-center text-8xl font-extrabold">
          The best platform to <br /> get hired by the upcoming <br /> startups.
        </h1>
        <p className="text-center cursor-default leading-8 text-2xl z-30 font-semibold text-gray-700 my-10">
          Hirely, India's first job platform, connects startup founders,
          business owners, <br /> recruiters, and HR heads directly to job{" "}
          <br /> seekers and candidates.
        </p>
        <Link
          id="cta-btn"
          to="/signin"
          className="text-white animate-gradient-x from-purple-400 via-primary-800 bg-gradient-to-r z-40 uppercase flex justify-center to-secondary-700 items-center  hover:shadow-2xl hover:shadow-primary-900 transition-all duration-300 ease-in-out font-bold text-3xl px-5 py-3 rounded-md"
        >
          Start Hiring
        </Link>
        <img
          src={Waves}
          alt="Waves"
          className="fixed overflow-hidden z-40  bottom-0 w-full"
        />
        <img
          src={Waves}
          alt="Waves"
          className="fixed overflow-hidden z-40 rotate-180  top-0 w-full"
        />
        <img src={recruiter} alt="img" className="fixed top-[25rem] left-10 " />
        <img
          src={candidate}
          alt="img"
          className="fixed top-[25rem] right-10 candidate"
        />
      </div>
    </>
  );
};

export default Home;
