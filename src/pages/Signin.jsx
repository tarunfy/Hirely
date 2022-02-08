import React, { useState } from "react";
import Blob from "../assets/blob.svg";
import { FiLogIn } from "react-icons/fi";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen justify-center items-center bg-slate-50">
      <div className="px-8 py-12 ml-16 w-128  z-20 rounded-lg shadow-material bg-slate-50">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center mb-6 font-bold text-5xl">
            Welcome Back 👋
          </h1>
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
            className="bg-primary-600 flex justify-center items-center uppercase hover:bg-primary-700 transition-colors duration-300 ease-in-out w-full text-lg font-bold px-5 py-2 rounded-md shadow-md shadow-primary-400 text-white"
          >
            <FiLogIn className="mr-2 text-xl" />
            Login
          </button>
        </form>
      </div>
      <img className="absolute z-0  h-screen" src={Blob} alt="blob" />
    </div>
  );
};

export default Signup;
