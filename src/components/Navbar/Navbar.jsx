import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { JobContext } from "../../contexts/JobContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Avatar } from "@mui/material";

const NavigationBar = () => {
  const { logout, currentUser } = useContext(AuthContext);
  const { setJobs } = useContext(JobContext);

  const handleLogout = () => {
    logout();
    setJobs(null);
  };

  return (
    <>
      <div
        className={`${
          currentUser && "shadow-md bg-slate-50"
        } w-full fixed  z-50 top-0 left-0 py-5  px-16  flex justify-between items-center`}
      >
        <div className="left cursor-default">
          {currentUser ? (
            <h1 className="text-4xl logo text-secondary-600">Hirely</h1>
          ) : (
            <Link to="/" className="text-4xl logo text-secondary-600">
              Hirely
            </Link>
          )}
        </div>
        {currentUser && (
          <div className="right  flex space-x-7 items-center">
            <Tippy content="Role" inertia animation="scale">
              <p className="cursor-default text-neutral-600">
                {currentUser.role}
              </p>
            </Tippy>
            {currentUser.role === "Applicant" && (
              <Link
                to="/applied-jobs"
                className="text-md underlined text-slate-700 font-light"
              >
                Applied Jobs
              </Link>
            )}
            <button
              className="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex"
              onClick={handleLogout}
            >
              <span className="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-sm text-secondary-600 text-center font-medium  bg-white ring-1 ring-secondary-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                Logout
              </span>
            </button>
            <Tippy content="Profile" inertia animation="scale">
              <Link to="/profile">
                <Avatar
                  className="!rounded-full !h-15 !w-15 object-cover"
                  src={
                    currentUser?.profilePhoto ? currentUser.profilePhoto : ""
                  }
                />
              </Link>
            </Tippy>
          </div>
        )}
      </div>
    </>
  );
};

export default NavigationBar;
