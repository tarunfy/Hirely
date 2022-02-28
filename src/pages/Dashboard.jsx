import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { currentUser, isLoading, getCurrentUser, isFetching } =
    useContext(AuthContext);
  const history = useHistory();
  console.log(currentUser);

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
    </div>
  );
};

export default Dashboard;
