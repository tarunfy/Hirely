import React, { useState, useContext } from "react";
import Grid from "../assets/grid.svg";
import { FaPencilAlt } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext";

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

  const { signup, isFetching } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === "Recruiter") {
      signup(email, password, {
        role,
        fullName,
        company,
        designation,
        phoneNumber,
      });
    } else {
      signup(email, password, {
        role,
        fullName,
        gender,
        experienceLevel,
        dob,
        phoneNumber,
      });
    }
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
            disabled={isFetching}
            className={`${
              !isFetching
                ? "bg-primary-600 hover:bg-primary-700"
                : "bg-primary-400 cursor-default"
            } flex justify-center items-center uppercase  transition-colors duration-300 ease-in-out w-full text-lg font-bold px-5 py-2 rounded-md shadow-md shadow-primary-400 text-white`}
          >
            {!isFetching ? (
              <>
                <FaPencilAlt className="mr-2" /> Register
              </>
            ) : (
              <>
                <svg
                  role="status"
                  className="mr-2 w-5 h-5 text-gray-200 animate-spin  fill-primary-500"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                Registering...
              </>
            )}
          </button>
        </form>
      </div>
      <img className="absolute right-0 z-0 h-screen" src={Grid} alt="" />
    </div>
  );
};

export default Signup;
