import React, { useState, useContext } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import person from "../../assets/3d.png";
import graph1 from "../../assets/graph.png";
import graph2 from "../../assets/graph2.png";
import graph3 from "../../assets/graph3.png";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
  });

  const [jobRequirements, setJobRequirements] = useState({
    experience: "",
    salary: "",
    education: "",
  });

  const history = useHistory();

  const { addDetails, currentUser, isLoading } = useContext(AuthContext);

  const { jobTitle, jobDescription, jobLocation } = jobDetails;

  const { experience, salary, education } = jobRequirements;

  const isDisabled =
    !jobDescription ||
    !jobTitle ||
    !jobLocation ||
    !experience ||
    !salary ||
    !education;

  const handleDetails = (e) => {
    setJobDetails({ ...jobDetails, [e.target.id]: e.target.value });
  };

  const handleRequirements = (e) => {
    setJobRequirements({ ...jobRequirements, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...jobDetails, jobRequirements };
    await addDetails(currentUser.userId, data);
    resetForm();
    history.push("/dashboard");
  };

  const resetForm = () => {
    setJobDetails({
      jobTitle: "",
      jobLocation: "",
      jobDescription: "",
    });
    setJobRequirements({
      experience: "",
      salary: "",
      education: "",
    });
  };

  return (
    <>
      <img
        src={person}
        alt="person"
        className="fixed bottom-20 right-0 h-96 w-96"
      />
      <img
        src={graph1}
        alt="graph"
        className="fixed top-20 left-10 h-20 w-20"
      />
      <img
        src={graph2}
        alt="graph"
        className="fixed bottom-30 left-40 h-20 w-20"
      />
      <img
        src={graph3}
        alt="graph"
        className="fixed top-20 right-10 h-20 w-20"
      />
      <h1 className="text-7xl font-bold mb-10 mt-10">Add your job details</h1>
      <div className="px-6 py-8 bg-slate-50 w-[34rem] shadow-material2 rounded-md">
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
            <label htmlFor="requirements" className="text-lg font-medium">
              Job requirements
            </label>
            <div className="flex justify-between items-center">
              <div className="w-1/3">
                <label htmlFor="experience" className="text-base">
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
              <div className="w-1/3">
                <label htmlFor="salary" className="text-base">
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
                  <option value="Rs 1 - 1 LPA">Rs 1 - 1 LPA</option>
                  <option value="Rs 2 - 5 LPA">Rs 2 - 5 LPA</option>
                  <option value="Rs 3 - 7 LPA">Rs 3 - 7 LPA</option>
                  <option value="Rs 8 - 12 LPA">Rs 8 - 12 LPA</option>
                  <option value="Rs 12 - 18 LPA">Rs 12 - 18 LPA</option>
                  <option value="Rs 18 - 24 LPA">Rs 18 - 24 LPA</option>
                  <option value="Rs 24 - 32 LPA">Rs 24 - 32 LPA</option>
                </select>
              </div>
              <div className="w-1/3">
                <label htmlFor="education" className="text-base">
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
              type="submit"
              disabled={isDisabled}
              className={`${
                isDisabled
                  ? "bg-secondary-400 cursor-default"
                  : "bg-secondary-600 hover:bg-secondary-700"
              } flex justify-center items-center  transition-colors duration-300 ease-in-out text-xl font-medium px-5 py-2 rounded-md  text-white`}
            >
              {!isLoading ? (
                <>
                  <HiDocumentAdd className="h-5 w-5 mr-1" /> Add
                </>
              ) : (
                <>
                  <svg
                    role="status"
                    className="mr-2 w-5 h-5 text-gray-200 animate-spin  fill-secondary-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Adding...
                </>
              )}
            </button>
            <button
              type="reset"
              onClick={() => resetForm()}
              className="flex justify-center  shadow-secondary-500 transition-all hover:bg-secondary-50 duration-500 ease-in-out bg-white  items-center py-2 px-4 text-secondary-600 border-[1px] border-secondary-600 rounded-md font-semibold text-lg"
            >
              <MdDelete className="h-5 w-5 mr-1" /> Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default JobDetails;
