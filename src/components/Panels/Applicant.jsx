import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { JobContext } from "../../contexts/JobContext";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "../index";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Modal, Select, Chip, FormControl, Box, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const techNames = [
  "ReactJs",
  "VueJs",
  "NextJs",
  "NodeJs",
  "MongoDB",
  "MySQL",
  "Firebase",
  "ExpressJs",
  "Flutter",
  "React Native",
  "AWS",
  "Docker",
  "Kubernetes",
  "Scss",
  "HTML",
  "CSS",
  "Javascript",
  "Typescript",
  "GSAP",
  "C++",
  "C#",
  "Laravel",
  "ThreeJs",
  "Postman",
  "Figma",
  "AdobeXD",
];

const Applicant = () => {
  const [addInterestsModal, setAddInterestsModal] = useState(false);
  const [interests, setInterests] = useState([]);
  const [activeInterest, setActiveInterest] = useState("");
  const [jobs, setJobs] = useState(null);

  const {
    addInterests,
    isLoading,
    fetchAllJobs,
    isFetchingJobs,
    fetchInterestedJobs,
    applyJob,
  } = useContext(JobContext);

  const { currentUser, updateCurrentUser } = useContext(AuthContext);

  const checkInterest = () => {
    if (currentUser.interests) {
      return;
    } else {
      setAddInterestsModal(true);
    }
  };

  useEffect(() => {
    checkInterest();
  }, []);

  useEffect(() => {
    async function fetchJobs() {
      const allJobs = await fetchAllJobs();
      if (allJobs.length > 0) {
        setJobs(allJobs);
      }
    }
    async function fetchInterestJobs() {
      const interestedJobs = await fetchInterestedJobs(activeInterest);
      setJobs(interestedJobs);
    }
    if (activeInterest === "") {
      fetchJobs();
    } else {
      fetchInterestJobs();
    }
  }, [activeInterest]);

  const closeInterestModal = () => {
    setAddInterestsModal(false);
    checkInterest();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInterests(interests);
    setInterests([]);
    setAddInterestsModal(false);
    const res = await updateCurrentUser();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Your job interests has been added 🥳");
    }
  };

  const handleApplyJob = async (jobId) => {
    await applyJob(jobId);
    if (activeInterest === "") {
      const allJobs = await fetchAllJobs();
      if (allJobs.length > 0) {
        setJobs(allJobs);
      } else {
        setJobs(null);
      }
    } else {
      const interestedJobs = await fetchInterestedJobs(activeInterest);
      setJobs(interestedJobs);
    }
  };

  if (isLoading || isFetchingJobs) return <Spinner />;

  return (
    <>
      <div className="flex flex-col justify-start items-center pt-28 px-16 bg-slate-50 h-screen w-full">
        {currentUser.interests && (
          <div className="flex justify-center space-x-6 flex-wrap mb-4 py-4 px-10  w-full">
            {currentUser.interests.map((interest, index) => (
              <p
                onClick={(e) => setActiveInterest(e.target.innerText)}
                onDoubleClick={() => setActiveInterest("")}
                key={index}
                className={` ${
                  activeInterest === interest &&
                  "bg-secondary-600 hover:shadow-lg hover:shadow-secondary-300 text-white shadow-lg shadow-secondary-300"
                } font-semibold hover:shadow-lg transition-shadow duration-200 ease-out rounded-full px-4 py-2 cursor-pointer border-2 border-secondary-500`}
              >
                {interest}
              </p>
            ))}
          </div>
        )}
        <div className="w-full overflow-y-scroll px-10 mt-10 ">
          {jobs && jobs.length > 0 ? (
            <ul className="w-full border-[1px] border-zinc-500 rounded-md bg-slate-50">
              {jobs.map((job, index) => (
                <li
                  key={index}
                  className="flex hover:shadow-inner  justify-between items-stretch cursor-default p-5 duration-300 transition-all ease-in-out"
                >
                  <div className="flex flex-col justify-between text-left">
                    <div className="mb-4">
                      <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
                      <h4 className="text-lg font-medium">
                        {job.jobDesignation}
                      </h4>
                      <p className="max-w-2xl text-base font-normal text-gray-900">
                        {job.jobDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <div>{moment(job.createdAt).format("MM/DD/YYYY")}</div>
                    <div className="flex items-center justify-end space-x-5">
                      <button
                        onClick={() => handleApplyJob(job.jobId)}
                        className="group relative inline-flex border border-secondary-600 focus:outline-none w-full sm:w-auto"
                      >
                        <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-sm text-white text-center font-bold uppercase bg-secondary-600 ring-1 ring-secondary-600 ring-offset-1 ring-offset-secondary-600 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                          Apply
                        </span>
                      </button>
                      <Tippy content="View details" inertia animation="scale">
                        <Link
                          to={`/job-details/${job.jobId}`}
                          className="border-[1px] border-black p-1"
                        >
                          <VisibilityIcon />
                        </Link>
                      </Tippy>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center font-medium text-xl">
              Oops, No jobs available yet...
            </p>
          )}
        </div>
      </div>
      <Modal
        open={addInterestsModal}
        onClose={closeInterestModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-6 rounded-md bg-slate-50 w-[40%] border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] text-center font-semibold">
            Add Your Interests
          </h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
            <div className="input-div my-4">
              <FormControl className="w-full bg-white">
                <Select
                  id="demo-multiple-chip"
                  multiple
                  required
                  autoComplete="off"
                  value={interests}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box className="flex flex-wrap gap-[10px]">
                      {selected.map((value) => (
                        <Chip
                          sx={{
                            color: "white",
                            backgroundColor: "#f43f5e",
                            fontWeight: "600",
                          }}
                          key={value}
                          label={value}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {techNames.map((techName, index) => (
                    <MenuItem key={index} value={techName}>
                      {techName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex justify-start items-center space-x-2">
              <button
                type="submit"
                className="font-semibold uppercase text-white bg-secondary-500 rounded-md  duration-300 ease-in-out hover:shadow-xl transition-all  text-xl  px-6 py-2"
              >
                Add
              </button>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Applicant;
