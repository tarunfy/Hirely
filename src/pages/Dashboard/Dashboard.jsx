import { useContext } from "react";
import { Navbar, Applicant, Recruiter } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {currentUser && currentUser.role === "Recruiter" ? (
        <Recruiter />
      ) : (
        <Applicant />
      )}
    </>
  );
};

export default Dashboard;
