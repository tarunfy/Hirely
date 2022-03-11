import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavigationBar from "../components/Navbar";
import Applicant from "../components/Panels/Applicant";
import Recruiter from "../components/Panels/Recruiter";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <NavigationBar />
      {currentUser && currentUser.role === "Recruiter" ? (
        <Recruiter />
      ) : (
        <Applicant />
      )}
    </>
  );
};

export default Dashboard;
