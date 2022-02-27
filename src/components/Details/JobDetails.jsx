import React from "react";
import { HiDocumentAdd } from "react-icons/hi";

const JobDetails = () => {
  return (
    <>
      <h1 className="text-6xl font-bold mb-10">Add your job details</h1>
      <div className="px-6 py-10 bg-slate-50 w-96 shadow-material2 rounded-md">
        <form className="w-full">
          <div className="input-div mb-4">
            <textarea
              placeholder="Job Title"
              required
              className="p-2 w-full border-[1px] text-lg rounded-md  border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <input
              type="text"
              required
              placeholder="Skills"
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <input
              type="text"
              required
              placeholder="Linkedin username"
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <input
              type="text"
              required
              placeholder="Education"
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <button
            type="submit"
            className="uppercase flex justify-center items-center py-2 px-4 text-white rounded-md font-semibold text-lg bg-primary-600"
          >
            <HiDocumentAdd className="h-5 w-5 mr-1" /> Add
          </button>
        </form>
      </div>
    </>
  );
};

export default JobDetails;
