import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="w-full z-20 tracking-widest px-16 py-6 flex justify-between items-center absolute top-0 bg-slate-50 shadow-md">
      {!currentUser ? (
        <Link to="/" className="cursor-pointer font-extrabold text-4xl">
          Hirely
        </Link>
      ) : (
        <div className="cursor-default font-extrabold text-4xl">Hirely</div>
      )}
      {!currentUser ? (
        <Link
          to="/signin"
          className="text-base uppercase font-Montserrat text-primary-800 border-2 border-primary-800  bg-slate-50 font-medium px-6 py-1 rounded-md hover:scale-95  transition-transform duration-200 ease-in-out"
        >
          Login
        </Link>
      ) : (
        <button
          onClick={() => logout()}
          className="text-base uppercase font-Montserrat text-primary-800 border-2 border-primary-800  bg-slate-50 font-medium px-6 py-1 rounded-md hover:scale-95  transition-transform duration-200 ease-in-out"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
