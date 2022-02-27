import React, { useState, useContext } from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";
import { MdDelete } from "react-icons/md";
import Login from "../assets/login.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isFetching, error, setError } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    login(email, password);
  };
  const handleClear = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div
      id="login-container"
      className="flex h-screen justify-between px-10 items-center bg-slate-50"
    >
      <div className="px-8 py-12 ml-16 w-[28rem] z-20 rounded-lg shadow-material bg-slate-50">
        <form onSubmit={handleSubmit}>
          <div className="input-container mb-5">
            <input
              type="email"
              className="p-2 border-[1px] border-gray-200 focus:outline-primary-400 w-full rounded-md text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="input-container mb-5">
            <input
              type="password"
              className=" focus:outline-primary-400 border-[1px] border-gray-200 p-2 w-full rounded-md text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {error && (
            <div className="text-center text-red-600 font-medium my-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={isFetching}
            className={`${
              !isFetching
                ? "bg-primary-600 hover:bg-primary-700"
                : "bg-primary-400 cursor-default"
            } flex justify-center items-center uppercase  transition-colors duration-300 ease-in-out w-full text-lg font-bold px-5 py-2 rounded-md shadow-md  text-white`}
          >
            {!isFetching ? (
              <>
                <RiUserSharedFill className="mr-2 h-5 w-5" />
                Login
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
                Logging...
              </>
            )}
          </button>
          <button
            onClick={handleClear}
            type="reset"
            className="border-primary-600 border-2 flex justify-center items-center text-center uppercase text-primary-600 w-full px-5 py-2 font-bold text-lg mt-4 rounded-md transition-colors duration-300 ease-in-out  hover:bg-primary-50"
          >
            <MdDelete className="mr-2 h-5 w-5" fill="#4f46e5" />
            Clear
          </button>
        </form>
      </div>
      <img src={Login} alt="login-img" className="w-128 h-128" />
    </div>
  );
};

export default Signup;
