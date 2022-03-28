import React, { useContext, useEffect } from "react";
import ApplicationCard from "../components/ApplicationCard";
import Navbar from "../components/Navbar";
import { JobContext } from "../contexts/JobContext";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const Applications = ({ match }) => {
  const { jobs, fetchJobs, isFetchingJobs } = useContext(JobContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetch() {
      await fetchJobs(currentUser.userId);
    }
    fetch();
  }, []);

  const applications =
    jobs &&
    jobs.filter((job) => job.jobId === match.params.jobId)[0].applications;

  if (isFetchingJobs) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start items-center pt-28 px-16 bg-slate-50 h-screen w-full overflow-y-scroll">
        <div className="w-full grid grid-cols-3 gap-4">
          {applications &&
            applications.map((application, index) => (
              <ApplicationCard applicantId={application.userId} key={index} />
            ))}
        </div>
      </div>
    </>
  );
};

export default Applications;
