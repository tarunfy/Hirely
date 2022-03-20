import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const NavigationBar = () => {
  const { logout, currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="w-full fixed top-0 left-0 py-5 shadow-md px-16 bg-slate-50 flex justify-between items-center">
        <div className="left cursor-default">
          <h1 className="text-4xl font-black text-secondary-600">Hirely</h1>
        </div>
        <div className="right flex space-x-7 items-center">
          {currentUser.role === "Applicant" && (
            <Link href className="text-md  text-slate-700 font-light">
              Applied Jobs
            </Link>
          )}
          <button
            class="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex"
            onClick={logout}
          >
            <span class="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-sm text-secondary-600 text-center font-bold uppercase bg-white ring-1 ring-secondary-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
              Logout
            </span>
          </button>
          <Tippy content="Profile" inertia animation="scale">
            <Link to="/profile">
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Link>
          </Tippy>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
