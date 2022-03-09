import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/Navbar";
import Applicant from "../components/Panels/Applicant";
import Recruiter from "../components/Panels/Recruiter";

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
