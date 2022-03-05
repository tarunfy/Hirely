import { Link } from "react-router-dom";
import Waves from "../assets/waves.svg";
import candidate from "../assets/candidate.svg";
import recruiter from "../assets/recruiter2.svg";

const Home = () => {
  return (
    <>
      <div id="blurry-gradient"></div>
      <div id="blurry-gradient2"></div>
      <div className="w-full flex justify-center flex-col bg-slate-50 items-center h-screen">
        <h1 className="z-30 text-center text-7xl leading-[5.5rem] font-extrabold">
          Direct Hiring App for Startup <br /> Ecosystem.
        </h1>
        <p className="text-center cursor-default leading-8 text-xl z-30 font-semibold text-gray-700 my-10">
          Hirely, India's first job platform, connects startup founders,
          business owners, <br /> recruiters, and HR heads directly to job{" "}
          <br /> seekers and candidates.
        </p>
        <Link
          id="cta"
          to="/signin"
          className="bg-white border-2 border-secondary-600 text-secondary-600  z-40 uppercase flex justify-center  items-center hover:bg-secondary-600 hover:text-white  hover:shadow-2xl hover:shadow-secondary-900 transition-all duration-300 ease-in-out hover:scale-105 font-semibold text-3xl px-5 py-3 rounded-full"
        >
          Start Hiring
        </Link>
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
