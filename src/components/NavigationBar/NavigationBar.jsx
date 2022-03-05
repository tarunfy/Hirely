import React, { useContext, useState } from "react";
import { NavigationData } from "./NavigationData";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="navigation-container flex justify-evenly items-center w-96 h-auto p-3 rounded-md fixed bottom-1 left-2/4 -translate-x-2/4">
        {NavigationData.map((value, index) => (
          <div>
            <Link
              key={index}
              className={`${
                window.location.pathname == value.link
                  ? "text-secondary-500"
                  : "text-slate-700 hover:text-black hover:scale-105 transition-all duration-300 ease-in-out"
              }  flex justify-center items-center flex-col `}
              to={value.link}
              id={value.title}
            >
              {value.icon}
              <span className="text-xs cursor-pointer">{value.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default NavigationBar;
