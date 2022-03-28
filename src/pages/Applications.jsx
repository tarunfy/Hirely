import React, { useContext, useEffect } from "react";
import ApplicationCard from "../components/ApplicationCard";
import Navbar from "../components/Navbar";
import { JobContext } from "../contexts/JobContext";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

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

  const job = jobs && jobs.filter((job) => job.jobId === match.params.jobId)[0];

  if (isFetchingJobs) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start items-center pt-28 px-16  h-screen w-full overflow-y-scroll">
        <div className="w-full p-20 relative grid grid-cols-3 gap-4">
          {applications &&
            applications.map((application, index) => (
              <ApplicationCard
                applicantId={application.userId}
                applicationStatus={application.status}
                job={job}
                key={index}
              />
            ))}
          <Link to="/dashboard" className="absolute top-0 left-0">
            <Button
              variant="outlined"
              startIcon={<ArrowBackOutlinedIcon />}
              className="!border-[1px] !border-gray-600 hover:!bg-transparent !text-black"
            >
              Go back
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Applications;
