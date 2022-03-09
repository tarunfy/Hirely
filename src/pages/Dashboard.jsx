import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const Dashboard = () => {
  return (
    <>
      <NavigationBar />
    </>
  );
};

export default Dashboard;
