import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, isLoading, getCurrentUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    getCurrentUser();
  }, []);

  if (
    (currentUser.role === "Recruiter" &&
      currentUser.jobDetails === undefined) ||
    (currentUser.role === "Applicant" && currentUser.workDetails === undefined)
  ) {
    history.push("/add-details");
  }

  if (isLoading) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <p className="text-9xl font-extrabold">Dashboard</p>
    </div>
  );
};

export default Dashboard;
