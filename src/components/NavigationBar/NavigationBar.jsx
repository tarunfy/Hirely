import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const NavigationBar = () => {
  return (
    <>
      <div className="w-full fixed top-0 left-0 py-4 shadow-lg px-12 bg-slate-50 flex justify-between items-center">
        <div className="left cursor-default">
          <h1 className="text-3xl font-black">Hirely</h1>
        </div>
        <div className="right flex space-x-7 items-center">
          <Tippy content="Profile" inertia animation="scale">
            <Link to="/profile">
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Link>
          </Tippy>
          <button className="font-semibold rounded-md ease-in-out  bg-secondary-500  text-white px-3 py-1 hover:bg-secondary-600 transition-colors duration-300">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
