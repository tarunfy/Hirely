import React, { useState } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const WorkDetails = () => {
  const [workDetails, setWorkDetails] = useState({
    skills: "",
    education: "",
    linkedinUsername: "",
    bio: "",
  });

  const handleChange = (e) => {
    setWorkDetails({ ...workDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(workDetails.skills.split(","));
    console.log(workDetails);
  };

  const handleReset = () => {
    setWorkDetails({
      skills: "",
      education: "",
      linkedinUsername: "",
      bio: "",
    });
  };

  return (
    <>
      <h1 className="text-7xl font-bold mb-10 mt-10">Add your work details</h1>
      <div className="px-6 py-8 bg-slate-50 w-[28rem] shadow-material2 rounded-md">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-div mb-4">
            <label
              htmlFor="skills"
              className="text-lg font-medium leading-[.1rem]"
            >
              Skills/Languages
              <span className="text-xs block font-normal">
                (Hint: Use comma to separate your skills)
              </span>
            </label>
            <input
              type="text"
              autoComplete="off"
              onChange={handleChange}
              value={workDetails.skills}
              id="skills"
              required
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <label htmlFor="education" className="text-lg font-medium">
              Education
            </label>
            <input
              type="text"
              value={workDetails.education}
              onChange={handleChange}
              autoComplete="off"
              required
              id="education"
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <label htmlFor="username" className="text-lg font-medium">
              Linkedin username
            </label>
            <input
              type="text"
              autoComplete="off"
              value={workDetails.linkedinUsername}
              onChange={handleChange}
              required
              id="linkedinUsername"
              className="p-2 w-full font-normal border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <label htmlFor="bio" className="text-lg font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              autoComplete="off"
              value={workDetails.bio}
              onChange={handleChange}
              required
              className="p-2 w-full border-[1px] text-lg rounded-md  border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="flex justify-start items-center space-x-2">
            <button
              type="submit"
              className="uppercase flex justify-center  transition-colors hover:bg-primary-700 duration-500 ease-in-out  items-center py-2 px-4 border-[1px] border-primary-600 text-white rounded-md font-semibold text-lg bg-primary-600"
            >
              <HiDocumentAdd className="h-5 w-5 mr-1" /> Add
            </button>
            <button
              type="reset"
              onClick={handleReset}
              className="uppercase flex justify-center  shadow-primary-500 transition-all hover:bg-primary-50 duration-500 ease-in-out bg-white  items-center py-2 px-4 text-primary-600 border-[1px] border-primary-600 rounded-md font-semibold text-lg"
            >
              <MdDelete className="h-5 w-5 mr-1" /> Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WorkDetails;
