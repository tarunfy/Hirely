import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import JobDetails from "../components/Details/JobDetails";
import WorkDetails from "../components/Details/WorkDetails";

const Details = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="h-screen flex justify-center items-center bg-slate-50 text-3xl">
      {currentUser.role === "Recruiter" ? <JobDetails /> : <WorkDetails />}
    </div>
  );
};

export default Details;
