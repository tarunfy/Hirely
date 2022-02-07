import React from "react";
import Grid from "../assets/grid.svg";

const Signup = () => {
  return (
    <div className="flex h-screen justify-between items-center bg-slate-50">
      <div className="px-4 py-8 ml-16 mt-10 w-128 rounded-lg shadow-material bg-slate-50">
        <div className="flex w-full items-center justify-evenly mb-5">
          <div className="flex items-center space-x-1">
            <input
              type="radio"
              checked
              id="recruiter"
              name="role"
              className="bg-slate-50"
            />
            <label htmlFor="recruiter">Register as recruiter</label>
          </div>
          <div className="flex items-center space-x-1">
            <input type="radio" id="applicant" name="role" />
            <label htmlFor="applicant">Register as applicant</label>
          </div>
        </div>
        <form>
          <div className="input-container mb-5">
            <input
              type="text"
              className="border-2 p-2 w-full rounded-md"
              placeholder="Full Name"
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="text"
              className="border-2 p-2 w-full rounded-md"
              placeholder="My Company"
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="text"
              className="border-2 p-2 w-full rounded-md"
              placeholder="Designation"
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="email"
              className="border-2 p-2 w-full rounded-md"
              placeholder="My Email"
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="password"
              className="border-2 p-2 w-full rounded-md"
              placeholder="Password"
            />
          </div>
          <button className="bg-primary-600 w-full text-lg font-bold px-5 py-2 rounded-md shadow-md shadow-primary-400 text-white">
            Register
          </button>
        </form>
      </div>
      <img className="absolute right-0 z-0 h-screen" src={Grid} alt="" />
    </div>
  );
};

export default Signup;
