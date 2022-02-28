import React from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

const JobDetails = () => {
  return (
    <>
      <h1 className="text-7xl font-bold mb-10 mt-10">Add your job details</h1>
      <div className="px-6 py-8 bg-slate-50 w-[34rem] shadow-material2 rounded-md">
        <form className="w-full">
          <div className="input-div mb-4">
            <label
              htmlFor="job-title"
              className="text-lg font-medium leading-[.1rem]"
            >
              Job title
            </label>
            <input
              type="text"
              autoComplete="off"
              id="job-title"
              required
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
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
                  id="experience"
                  className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-primary-300"
                >
                  <option value="" selected>
                    Select
                  </option>
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
                  required
                  className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-primary-300"
                >
                  <option value="" selected>
                    Select
                  </option>
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
                  required
                  className="p-1 border-[1px] text-sm rounded-md border-gray-200 focus:outline-primary-300"
                >
                  <option value="" selected>
                    Select
                  </option>
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
              required
              id="location"
              className="p-2 w-full font-normal border-[1px] text-lg rounded-md border-gray-200 focus:outline-primary-300"
            />
          </div>
          <div className="input-div mb-4">
            <label htmlFor="job-description" className="text-lg font-medium">
              Job description
            </label>
            <textarea
              id="job-description"
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

export default JobDetails;
