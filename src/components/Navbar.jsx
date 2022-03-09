import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const NavigationBar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <>
      <div className="w-full fixed top-0 left-0 py-5 shadow-md px-16 bg-slate-50 flex justify-between items-center">
        <div className="left cursor-default">
          <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-600  to-secondary-600 animate-gradient-x">
            Hirely
          </h1>
        </div>
        <div className="right flex space-x-7 items-center">
          <Tippy content="Profile" inertia animation="scale">
            <Link to="/profile">
              <Avatar>
                <PersonIcon />
              </Avatar>
            </Link>
          </Tippy>
          <button
            onClick={() => logout()}
            className="font-semibold text-lg rounded-md ease-in-out  bg-secondary-500  text-white px-4 py-1 hover:bg-secondary-600 transition-colors duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
