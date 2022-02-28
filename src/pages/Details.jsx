import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import JobDetails from "../components/Details/JobDetails";
import WorkDetails from "../components/Details/WorkDetails";
import Spinner from "../components/Spinner";

const Details = () => {
  const { currentUser, isLoading, isFetching } = useContext(AuthContext);

  if (isLoading || isFetching) return <Spinner />;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50">
      {currentUser.role === "Recruiter" ? <JobDetails /> : <WorkDetails />}
    </div>
  );
};

export default Details;
