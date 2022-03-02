import React, { useContext } from "react";
import { SidebarData } from "./SidebarData";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="h-screen absolute left-0 top-0 w-56 bg-secondary-800 flex justify-between py-10 flex-col">
      <div id="top" className="py-3 text-center">
        <h2 className="text-white font-extrabold  text-3xl  cursor-default">
          Hirely
        </h2>
      </div>
      <div
        id="mid"
        className="flex flex-col items-center justify-center space-y-2"
      >
        {SidebarData.map((value, index) => (
          <Link
            to={value.link}
            key={index}
            className={`${
              window.location.pathname == value.link
                ? "bg-secondary-600 py-4 w-full flex justify-evenly items-center cursor-pointer"
                : "hover:bg-white hover:text-secondary-500 hover:shadow-2xl text-white transition-all duration-500 ease-in-out py-4 w-full flex justify-evenly items-center cursor-pointer"
            }  `}
          >
            <div className=" flex w-2/5 justify-end px-3">{value.icon}</div>
            <h4 className=" text-lg font-medium flex w-3/5">{value.title}</h4>
          </Link>
        ))}
      </div>
      <div
        className="text-slate-300 hover:text-white  transition-colors duration-300 ease-in-out  py-4 w-full flex justify-evenly items-center cursor-pointer"
        onClick={logout}
      >
        <div className="flex w-2/5 justify-end px-3">
          <MdOutlineLogout className="h-5 w-5" />
        </div>
        <h4 className="text-lg font-medium flex w-3/5">Logout</h4>
      </div>
    </div>
  );
};

export default Sidebar;
