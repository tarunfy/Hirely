import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { isLoading, getCurrentUser, isFetching, logout } =
    useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const res = await getCurrentUser();
      if (!res) {
        history.push("/add-details");
      }
    }
    fetchUser();
  }, []);

  if (isLoading || isFetching) return <Spinner />;

  return (
    <div className="flex justify-center items-center h-screen bg-slate-50">
      <p className="text-9xl font-extrabold">Dashboard</p>
      <button
        onClick={() => logout()}
        className="text-base text-primary-800 border-2 border-primary-800  bg-slate-50 font-medium px-6 py-1 rounded-md hover:scale-95  transition-transform duration-200 ease-in-out"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
