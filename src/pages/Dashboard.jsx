import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar/Sidebar";

const Dashboard = () => {
  const { isLoading, getCurrentUser, isFetching, currentUser } =
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
    <>
      <Sidebar />
      <div className="h-screen pl-56 w-full bg-slate-50 text-center">
        <p className="text-6xl">Welcome {currentUser.phoneNumber} 👋🏻</p>
      </div>
    </>
  );
};

export default Dashboard;
