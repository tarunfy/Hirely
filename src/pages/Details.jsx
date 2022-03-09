import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { JobContext } from "../contexts/JobContext";
import JobDetails from "../components/Details/JobDetails";
import WorkDetails from "../components/Details/WorkDetails";
import Spinner from "../components/Spinner";

const Details = () => {
  const { currentUser, isLoading, isFetching } = useContext(AuthContext);

  const { jobs, fetchJobs, isFetchingJobs } = useContext(JobContext);

  useEffect(() => {
    async function fetch() {
      await fetchJobs(currentUser.userId);
    }
    fetch();
  }, []);

  const history = useHistory();

  if (jobs) history.push("/dashboard");

  if (isLoading || isFetchingJobs) return <Spinner />;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50">
      {currentUser.role === "Recruiter" ? <JobDetails /> : <WorkDetails />}
    </div>
  );
};

export default Details;
