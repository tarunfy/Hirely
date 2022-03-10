import { useContext, useState, useEffect } from "react";
import { JobContext } from "../../contexts/JobContext";
import { AuthContext } from "../../contexts/AuthContext";
import JobCard from "../JobCard";
import AddIcon from "@mui/icons-material/Add";
import { Modal, Box } from "@mui/material";
import Spinner from "../Spinner";

const Recruiter = () => {
  const [addStaffModal, setAddStaffModal] = useState(false);
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    jobDesignation: "",
  });

  const [jobRequirements, setJobRequirements] = useState({
    experience: "",
    salary: "",
    education: "",
  });

  const { jobTitle, jobDescription, jobLocation, jobDesignation } = jobDetails;

  const { experience, salary, education } = jobRequirements;

  const { currentUser } = useContext(AuthContext);

  const { jobs, addJobDetails, isLoading, fetchJobs, isFetchingJobs } =
    useContext(JobContext);

  const handleDetails = (e) => {
    setJobDetails({ ...jobDetails, [e.target.id]: e.target.value });
  };

  const handleRequirements = (e) => {
    setJobRequirements({ ...jobRequirements, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...jobDetails,
      jobRequirements,
      userId: currentUser.userId,
      createdAt: Date.now(),
    };
    await addJobDetails(data);
    closeAddStaffModal();
    clearModal();
    await fetchJobs(currentUser.userId);
  };

  const openAddStaffModal = () => {
    setAddStaffModal(true);
  };

  const closeAddStaffModal = () => {
    setAddStaffModal(false);
  };

  const clearModal = () => {
    setJobDetails({
      jobTitle: "",
      jobLocation: "",
      jobDescription: "",
      jobDesignation: "",
    });
    setJobRequirements({
      experience: "",
      salary: "",
      education: "",
    });
  };

  if (isLoading || isFetchingJobs) return <Spinner />;

  return (
    <>
      <div className="flex flex-col justify-start items-center pt-28 px-16 bg-slate-50 h-screen w-full">
        <div className="top flex justify-between items-center w-full">
          <h1 className="text-5xl font-bold">Your Job Openings</h1>
          <button
            onClick={openAddStaffModal}
            className="uppercase font-medium border-[1px] hover:scale-95 hover:bg-secondary-500 hover:text-white hover:shadow-xl hover:shadow-secondary-300 transition-all ease-in-out duration-300 flex items-center border-secondary-500 text-xl px-5 py-2 text-secondary-500"
          >
            <AddIcon className="mr-1" />
            Add
          </button>
        </div>
        <div className="bottom w-full overflow-y-scroll  px-10 mt-20">
          {jobs ? (
            <>
              <ul className="w-full border-[1px] border-zinc-500 rounded-md bg-slate-50">
                {jobs.map((job, index) => (
                  <JobCard key={index} job={job} />
                ))}
              </ul>
            </>
          ) : (
            <>
              <h1 className="text-center text-lg font-bold">
                Please add a job.
              </h1>
            </>
          )}
        </div>
      </div>
      <Modal
        open={addStaffModal}
        onClose={closeAddStaffModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-6 rounded-md bg-slate-50 w-[40%] border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] text-center font-semibold">Add Job</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="input-div mb-4">
              <label
                htmlFor="job-title"
                className="text-lg font-medium leading-[.1rem]"
              >
                Job title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => handleDetails(e)}
                autoComplete="off"
                id="jobTitle"
                required
                className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
              />
            </div>
            <div className="input-div mb-4">
              <label htmlFor="designation" className="text-lg font-medium">
                Job designation
              </label>
              <input
                type="text"
                autoComplete="off"
                value={jobDesignation}
                onChange={(e) => handleDetails(e)}
                required
                id="jobDesignation"
                className="p-2 w-full font-normal border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
              />
            </div>
            <div className="input-div mb-4">
              <label htmlFor="requirements" className="text-lg font-medium">
                Job requirements
              </label>
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="experience" className="text-base block">
                    Experience
                  </label>
                  <select
                    name="requirements"
                    required
                    value={experience}
                    onChange={(e) => handleRequirements(e)}
                    id="experience"
                    className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-secondary-300"
                  >
                    <option value="Any Experience">Any Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">0-1 Year</option>
                    <option value="1-3">1-3 Years</option>
                    <option value="3-5">3-5 Years</option>
                    <option value="5-10">5-10 Years</option>
                    <option value="10+">10+ Years</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="salary" className="text-base block">
                    Salary
                  </label>
                  <select
                    name="requirements"
                    id="salary"
                    value={salary}
                    onChange={(e) => handleRequirements(e)}
                    required
                    className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-secondary-300"
                  >
                    <option value="$ 1k - 1k">$ 1k - 1k</option>
                    <option value="$ 2k - 5k">$ 2k - 5k</option>
                    <option value="$ 3k - 7k">$ 3k - 7k</option>
                    <option value="$ 8k - 12k">$ 8k - 12k</option>
                    <option value="$ 12k - 18k">$ 12k - 18k</option>
                    <option value="$ 18k - 24k">$ 18k - 24k</option>
                    <option value="$ 24k - 32k">$ 24k - 32k</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="education" className="text-base block">
                    Education
                  </label>
                  <select
                    name="requirements"
                    id="education"
                    value={education}
                    onChange={(e) => handleRequirements(e)}
                    required
                    className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-secondary-300"
                  >
                    <option value="Doctorate">Doctorate</option>
                    <option value="Post-Graduation">Post-Graduation</option>
                    <option value="Graduation/Diploma">Graduation</option>
                    <option value="Diploma">Diploma</option>
                    <option value="School">School</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="input-div mb-4">
              <label htmlFor="location" className="text-lg font-medium">
                Job location
              </label>
              <input
                type="text"
                autoComplete="off"
                value={jobLocation}
                onChange={(e) => handleDetails(e)}
                required
                id="jobLocation"
                className="p-2 w-full font-normal border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
              />
            </div>

            <div className="input-div mb-4">
              <label htmlFor="job-description" className="text-lg font-medium">
                Job description
              </label>
              <textarea
                id="jobDescription"
                value={jobDescription}
                onChange={(e) => handleDetails(e)}
                autoComplete="off"
                required
                className="p-2 w-full border-[1px] text-lg rounded-md  border-gray-200 focus:outline-secondary-300"
              />
            </div>
            <div className="flex justify-start items-center space-x-2">
              <button
                onClick={closeAddStaffModal}
                className="font-semibold text-red-500 rounded-lg border-red-500 border-[1px]  duration-300 ease-in-out hover:shadow-xl transition-all  text-xl   px-6 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="font-semibold text-white bg-secondary-500 rounded-md  duration-300 ease-in-out hover:shadow-xl transition-all  text-xl  px-6 py-2"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default Recruiter;
