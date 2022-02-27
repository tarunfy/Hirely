import React from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const WorkDetails = () => {
  return (
    <>
      <h1 className="text-6xl font-bold mb-10 mt-10">Add your work details</h1>
      <div className="px-6 py-8 bg-slate-50 w-[28rem] shadow-material2 rounded-md">
        <form className="w-full">
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
              autoComplete="off"
              required
              if="education"
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
              required
              id="username"
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
              type="submit"
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
