import { useContext, useState } from "react";
import { JobContext } from "../contexts/JobContext";
import { AuthContext } from "../contexts/AuthContext";
import { Modal, Select, Chip, FormControl, Box, MenuItem } from "@mui/material";
import Spinner from "../components/Spinner";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FeedIcon from "@mui/icons-material/Feed";

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

const JobCard = ({ job }) => {
  const [updateJobModal, setUpdateJobModal] = useState(false);
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

  const [tags, setTags] = useState([]);

  const { jobTitle, jobDescription, jobLocation, jobDesignation } = jobDetails;

  const { experience, salary, education } = jobRequirements;

  const { currentUser } = useContext(AuthContext);

  const {
    removeJob,
    updateJob,
    fetchJob,
    fetchJobs,
    isFetchingJobs,
    isLoading,
  } = useContext(JobContext);

  const handleDetails = (e) => {
    setJobDetails({ ...jobDetails, [e.target.id]: e.target.value });
  };

  const handleRequirements = (e) => {
    setJobRequirements({ ...jobRequirements, [e.target.id]: e.target.value });
  };

  const updateJobPosting = async (e, jobId) => {
    e.preventDefault();
    const data = {
      ...jobDetails,
      jobRequirements,
      jobTags: tags,
      userId: currentUser.userId,
    };
    await updateJob(jobId, data);
    clearModal();
    closeUpdateJobModal();
    await fetchJobs(currentUser.userId);
  };

  const openUpdateJobModal = async () => {
    const data = await fetchJob(job.jobId);
    setJobDetails({
      jobTitle: data.jobTitle,
      jobDescription: data.jobDescription,
      jobDesignation: data.jobDesignation,
      jobLocation: data.jobLocation,
    });
    setJobRequirements({
      experience: data.jobRequirements.experience,
      salary: data.jobRequirements.salary,
      education: data.jobRequirements.education,
    });
    setTags([...data.jobTags]);
    setUpdateJobModal(true);
  };

  const closeUpdateJobModal = () => {
    setUpdateJobModal(false);
    clearModal();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
    setTags([]);
  };

  const handleRemoveJob = async () => {
    await removeJob(job.jobId);
    await fetchJobs(currentUser.userId);
  };

  if (isLoading || isFetchingJobs) return <Spinner />;

  return (
    <>
      <li className="flex hover:shadow-inner  justify-between items-stretch cursor-default p-5 duration-300 transition-all ease-in-out">
        <div className="flex flex-col justify-between text-left">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">{job.jobTitle}</h1>
            <h4 className="text-lg font-medium">{job.jobDesignation}</h4>
            <p className="max-w-2xl text-base font-normal text-gray-900">
              {job.jobDescription}
            </p>
          </div>
          <div>
            <h3>
              Applications count:{" "}
              <span className="font-medium">{job.applications.length}</span>
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-between text-right">
          <div>{moment(job.createdAt).format("MM/DD/YYYY")}</div>
          <div className="flex items-center justify-end space-x-5">
            <Tippy content="Applications" inertia animation="scale">
              <button className="border-[1px] border-black p-2">
                <FeedIcon />
              </button>
            </Tippy>
            <Tippy content="Edit" inertia animation="scale">
              <button
                onClick={openUpdateJobModal}
                className="border-[1px] border-black p-2"
              >
                <EditIcon />
              </button>
            </Tippy>
            <Tippy content="Remove" inertia animation="scale">
              <button
                onClick={handleRemoveJob}
                className="border-[1px]  border-black p-2"
              >
                <RemoveCircleOutlineIcon />
              </button>
            </Tippy>
            <Tippy content="View details" inertia animation="scale">
              <button className="border-[1px] border-black p-2">
                <VisibilityIcon />
              </button>
            </Tippy>
          </div>
        </div>
      </li>
      <Modal
        open={updateJobModal}
        onClose={closeUpdateJobModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-6 rounded-md h-[85%] overflow-y-scroll bg-slate-50 w-[40%] border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] text-center font-semibold">Update Job</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
          <form
            className="w-full"
            onSubmit={(e) => updateJobPosting(e, job.jobId)}
          >
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
            <div className="input-div my-4">
              <label
                htmlFor="job-title"
                className="text-lg font-medium leading-[.1rem]"
              >
                Job tags
              </label>
              <FormControl className="w-full bg-white">
                <Select
                  id="demo-multiple-chip"
                  multiple
                  required
                  autoComplete="off"
                  value={tags}
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
                onClick={closeUpdateJobModal}
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

export default JobCard;
