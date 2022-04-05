import React, { useEffect, useContext, useState } from "react";
import { Spinner } from "../../components";
import { JobContext } from "../../contexts/JobContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const JobDetails = ({ match }) => {
  const [job, setJob] = useState(null);

  const { fetchJobDetails, isFetchingJobs } = useContext(JobContext);

  useEffect(() => {
    async function getJobdetails() {
      const jobDetails = await fetchJobDetails(match.params.jobId);
      setJob(jobDetails);
    }
    getJobdetails();
  }, []);

  if (isFetchingJobs) return <Spinner />;

  return (
    <div className="bg-slate-50 relative px-10 py-20 h-screen w-full">
      <Link
        to="/dashboard"
        className="absolute top-5 left-10 hover:scale-95 transition-transform ease-in-out"
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlinedIcon />}
          className="!border-[1px] !normal-case !border-gray-600 hover:!bg-transparent !text-black"
        >
          Home
        </Button>
      </Link>

      <div className="flex w-full flex-col justify-center h-full items-center">
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-black mb-6 underline text-stone-900">
            {job?.jobTitle}
          </h1>

          <p className="text-lg  font-semibold">{job?.jobDescription}</p>
        </div>

        <div className="w-[45%]  py-4 bg-white shadow-sm border-[1px] border-gray-200 mb-7 rounded-md">
          <h1 className="text-center text-2xl font-semibold mb-4">
            Requirements:
          </h1>
          <div
            className="grid grid-cols-3 divide-x-2 
                    divide-gray-500 text-lg font-medium"
          >
            <div className="text-center">
              <h4 className="text-lg">Education:</h4>
              <p className="text-sm text-gray-600">
                {job?.jobRequirements.education}
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-lg">Experience:</h4>
              <p className="text-sm text-gray-600">
                {job?.jobRequirements.experience}
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-lg">Salary:</h4>
              <p className="text-sm text-gray-600">
                {job?.jobRequirements.salary}
              </p>
            </div>
          </div>
        </div>

        <div className="py-4 px-8 bg-white border-[1px] shadow-sm border-gray-200 mb-7 rounded-md">
          <h1 className="text-center text-2xl font-semibold mb-2">
            More info:
          </h1>
          <p className="text-lg">
            Your working location will be:{" "}
            <span className="font-medium">{job?.jobLocation}</span>
          </p>
          <p className="text-lg">
            Your job designation will be:{" "}
            <span className="font-medium">{job?.jobDesignation}</span>
          </p>
        </div>

        <div className="tags flex justify-evenly space-x-8 ">
          {job?.jobTags.map((tag, index) => (
            <div key={index} className="bg-secondary-600 p-2 rounded-full">
              <p className="text-lg text-white ">{tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
