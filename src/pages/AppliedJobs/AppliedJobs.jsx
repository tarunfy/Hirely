import { useContext, useEffect, useState } from "react";
import { Navbar, AppliedJobCard, Spinner } from "../../components";
import { JobContext } from "../../contexts/JobContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState(null);

  const { fetchAppliedJobs, isFetchingJobs } = useContext(JobContext);

  useEffect(() => {
    async function getAppliedJobs() {
      const jobs = await fetchAppliedJobs();
      setAppliedJobs(jobs);
    }
    getAppliedJobs();
  }, []);

  if (isFetchingJobs) return <Spinner />;

  return (
    <div className="relative">
      <Navbar />
      <Link
        to="/dashboard"
        className="absolute top-24 left-10 z-40 hover:scale-95 transition-transform ease-in-out"
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlinedIcon />}
          className="!border-[1px] !normal-case !border-gray-600 hover:!bg-transparent !text-black"
        >
          Home
        </Button>
      </Link>
      {appliedJobs && appliedJobs.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 pt-40 px-16 bg-slate-50 h-screen w-full">
          {appliedJobs.map((job, index) => (
            <AppliedJobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <div className="pt-60 h-screen">
          <h1 className="text-center text-xl font-medium">
            You have not applied to any jobs yet,{" "}
            <Link to="/dashboard" className="text-secondary-600 font-bold">
              Apply now
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
