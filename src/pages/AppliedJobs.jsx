import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../contexts/JobContext";
import NavigationBar from "../components/Navbar";
import AppliedJobCard from "../components/AppliedJobCard";
import Spinner from "../components/Spinner";

const AppliedJobs = () => {
  const [appliedJobss, setappliedJobss] = useState(null);
  const { fetchAppliedJobs, isFetchingJobs } = useContext(JobContext);

  useEffect(() => {
    async function getAppliedJobs() {
      const appliedJobs = await fetchAppliedJobs();
      setappliedJobss(appliedJobs);
    }
    getAppliedJobs();
  }, []);

  if (isFetchingJobs) return <Spinner />;

  return (
    <>
      <NavigationBar />
      {appliedJobss && appliedJobss.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-4 gap-y-5 pt-36 px-16 bg-slate-50 h-screen w-full">
          {appliedJobss.map((job, index) => (
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
    </>
  );
};

export default AppliedJobs;
