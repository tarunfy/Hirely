import React, { useState, useContext } from "react";
import { HiDocumentAdd } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router";
import appdev from "../../assets/app.svg";
import coding from "../../assets/coding.svg";

const WorkDetails = () => {
  const [workDetails, setWorkDetails] = useState({
    skills: "",
    education: "",
    linkedinUsername: "",
    bio: "",
  });

  const history = useHistory();

  const { addDetails, currentUser, isLoading } = useContext(AuthContext);

  const isDisabled =
    !workDetails.skills ||
    !workDetails.education ||
    !workDetails.bio ||
    !workDetails.linkedinUsername;

  const handleChange = (e) => {
    setWorkDetails({ ...workDetails, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDetails(currentUser.userId, workDetails);
    handleReset();
    history.push("/dashboard");
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
      <img
        src={appdev}
        alt="student"
        className="w-128 h-128 z-0 fixed -left-10 bottom-10"
      />
      <img
        src={coding}
        alt="student"
        className="w-128 h-128 z-0 fixed -right-10 bottom-10 "
      />
      <h1 className="text-7xl z-20 font-bold mb-10 mt-10">
        Add your work details
      </h1>
      <div className="px-6 py-8 z-20 bg-slate-50 w-[28rem] shadow-material2 rounded-md">
        <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
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
              onChange={(e) => handleChange(e)}
              value={workDetails.skills}
              id="skills"
              required
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
            />
          </div>
          <div className="input-div mb-4">
            <label htmlFor="education" className="text-lg font-medium">
              Education
            </label>
            <input
              type="text"
              value={workDetails.education}
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              required
              id="education"
              className="p-2 w-full border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
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
              onChange={(e) => handleChange(e)}
              required
              id="linkedinUsername"
              className="p-2 w-full font-normal border-[1px] text-lg rounded-md border-gray-200 focus:outline-secondary-300"
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
              onChange={(e) => handleChange(e)}
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
              onClick={() => handleReset()}
              className="uppercase flex justify-center  shadow-secondary-500 transition-all hover:bg-secondary-50 duration-500 ease-in-out bg-white  items-center py-2 px-4 text-secondary-600 border-[1px] border-secondary-600 rounded-md font-semibold text-lg"
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
