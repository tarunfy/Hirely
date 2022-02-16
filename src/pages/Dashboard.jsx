import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      Dashboard
    </div>
  );
};

export default Dashboard;
