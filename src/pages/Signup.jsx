import React, { useState } from "react";
import Grid from "../assets/grid.svg";

const Signup = () => {
  const [role, setRole] = useState("Recruiter");
  const [gender, setGender] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-screen justify-between items-center bg-slate-50">
      <div className="px-4 py-8 ml-16 mt-24 w-128 rounded-lg shadow-material bg-slate-50">
        <div className="flex w-full items-center justify-evenly mb-5">
          <div className="flex items-center space-x-1">
            <input
              type="radio"
              checked={role === "Recruiter"}
              id="recruiter"
              onClick={() => setRole("Recruiter")}
              name="role"
            />
            <label htmlFor="recruiter" className="text-lg">
              Register as recruiter
            </label>
          </div>
          <div className="flex items-center space-x-1">
            <input
              type="radio"
              id="applicant"
              name="role"
              onClick={() => setRole("Applicant")}
              checked={role === "Applicant"}
            />
            <label htmlFor="applicant" className="text-lg">
              Register as applicant
            </label>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container mb-5">
            <input
              type="text"
              className="border-2 p-2 w-full rounded-md "
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input-container mb-5">
            {role === "Recruiter" ? (
              <input
                type="text"
                className="border-2 p-2 w-full rounded-md"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="My Company"
                required
              />
            ) : (
              <input
                type="text"
                className="border-2 p-2 w-full rounded-md"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                placeholder="Experience Level"
                required
              />
            )}
          </div>
          <div className="input-container mb-5">
            {role === "Recruiter" ? (
              <input
                type="text"
                className="border-2 p-2 w-full rounded-md"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Designation"
                required
              />
            ) : (
              <select
                name="gender"
                id="gender"
                className="border-2 p-2 w-full rounded-md"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="none" selected>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            )}
          </div>
          {role === "Applicant" && (
            <div className="input-container mb-5">
              <input
                type="date"
                className="border-2 p-2 w-full rounded-md"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="Date of birth"
                required
              />
            </div>
          )}
          <div className="input-container mb-5">
            <input
              type="number"
              className="border-2 p-2 w-full rounded-md"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="email"
              className="border-2 p-2 w-full rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="password"
              className="border-2 p-2 w-full rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary-600 uppercase hover:bg-primary-700 transition-colors duration-300 ease-in-out w-full text-lg font-bold px-5 py-2 rounded-md shadow-md shadow-primary-400 text-white"
          >
            Register
          </button>
        </form>
      </div>
      <img className="absolute right-0 z-0 h-screen" src={Grid} alt="" />
    </div>
  );
};

export default Signup;
