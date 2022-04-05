import React, { useContext, useEffect } from "react";
import { Navbar, Spinner, ApplicationCard } from "../../components";
import { JobContext } from "../../contexts/JobContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const Applications = ({ match }) => {
  const { jobs, fetchJobs, isFetchingJobs } = useContext(JobContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    async function getJobs() {
      await fetchJobs(currentUser.userId);
    }
    getJobs();
  }, []);

  const applications =
    jobs &&
    jobs.filter((job) => job.jobId === match.params.jobId)[0].applications;

  const job = jobs && jobs.filter((job) => job.jobId === match.params.jobId)[0];

  if (isFetchingJobs) return <Spinner />;

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-start items-center relative pt-28 px-16  h-screen w-full overflow-y-scroll">
        <Link
          to="/dashboard"
          className="absolute top-25 left-10 z-40 hover:scale-95 transition-transform ease-in-out"
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackOutlinedIcon />}
            className="!border-[1px] !normal-case !border-gray-600 hover:!bg-transparent !text-black"
          >
            Home
          </Button>
        </Link>
        {applications?.length > 0 ? (
          <div className="w-full z-10 p-20 relative grid grid-cols-3 gap-4">
            {applications.map((application, index) => (
              <ApplicationCard
                applicantId={application.userId}
                applicationStatus={application.status}
                job={job}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div className="text-2xl h-screen flex justify-center items-center font-medium">
            <h1>No Applications found...</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Applications;
