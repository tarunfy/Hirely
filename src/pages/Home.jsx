import { Link } from "react-router-dom";
import Waves from "../assets/waves.svg";
import candidate from "../assets/candidate.svg";
import recruiter from "../assets/recruiter2.svg";
import { IoArrowForwardCircle } from "react-icons/io5";
import highlight from "../assets/highlight.svg";

const Home = () => {
  return (
    <>
      <div id="blurry-gradient"></div>
      <div id="blurry-gradient2"></div>
      <div className="w-full flex justify-center flex-col bg-slate-50 items-center h-screen">
        <h1
          id="hero-heading"
          className="z-30 text-center text-7xl leading-[5.5rem]"
        >
          Direct <span className="text-secondary-600">Hiring</span> App for
          <span className="text-secondary-600"> Startup</span> <br /> Ecosystem.
        </h1>
        <p className="text-center cursor-default leading-7 text-lg z-30 font-light text-gray-700 my-10">
          Hirely, first job platform, connects startup founders, business
          owners,
          <br />
          recruiters, and HR heads directly to job
          <br />
          seekers and candidates.
        </p>
        <div className="relative">
          <Link
            to="/signin"
            className="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex"
          >
            <span className="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-2xl text-secondary-600 text-center font-bold uppercase bg-white ring-1 ring-secondary-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
              Get Started <IoArrowForwardCircle className="h-8 w-8 ml-1" />
            </span>
          </Link>
          <img
            src={highlight}
            alt="highlight"
            className="absolute animate-pulse -top-8 -right-8"
          />
        </div>
        <img
          src={Waves}
          alt="Waves"
          className="fixed overflow-hidden z-30  bottom-0 w-full waves-bottom"
        />
        <img
          src={Waves}
          alt="Waves"
          className="fixed overflow-hidden  z-30 rotate-180  top-0 w-full waves-top"
        />
        <img
          src={recruiter}
          alt="img"
          className="fixed top-[25rem] transition-all duration-300 ease-in-out left-10 recruiter hover:scale-105 hover:-rotate-1"
        />
        <img
          src={candidate}
          alt="img"
          className="fixed top-[25rem] transition-all duration-300 ease-in-out right-10 candidate hover:scale-105 hover:rotate-1"
        />
      </div>
    </>
  );
};

export default Home;
