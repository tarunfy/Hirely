import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { JobContext } from "../contexts/JobContext";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/Navbar";
import Applicant from "../components/Panels/Applicant";
import Recruiter from "../components/Panels/Recruiter";

const Dashboard = () => {
  const { isLoading, isFetching, currentUser } = useContext(AuthContext);
  const { fetchJobs, isFetchingJobs } = useContext(JobContext);

  const history = useHistory();

  useEffect(() => {
    async function fetch() {
      const res = await fetchJobs(currentUser.userId);
      if (!res) {
        history.push("/add-details");
      }
    }
    fetch();
  }, []);

  if (isLoading || isFetching || isFetchingJobs) return <Spinner />;

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
