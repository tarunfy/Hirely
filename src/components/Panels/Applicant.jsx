import { useState, useContext, useEffect } from "react";
import { JobContext } from "../../contexts/JobContext";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../Spinner";
import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { Modal, Select, Chip, FormControl, Box, MenuItem } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
  const [jobs, setJobs] = useState([]);

  const { addInterests, isLoading, fetchAllJobs, isFetchingJobs } =
    useContext(JobContext);
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
    if (activeInterest === "") {
      fetchJobs();
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
    await addInterests(interests, currentUser);
    setInterests([]);
    setAddInterestsModal(false);
    await updateCurrentUser();
    setAddInterestsModal(false);
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
                  "bg-secondary-600 text-white shadow-lg shadow-secondary-300"
                } font-semibold hover:shadow-lg transition-shadow duration-200 ease-out rounded-full px-4 py-2 cursor-pointer bg-white border-2 border-secondary-500`}
              >
                {interest}
              </p>
            ))}
          </div>
        )}
        <div className="w-full overflow-y-scroll px-10 mt-10">
          <ul className="w-full border-[1px] border-zinc-500 rounded-md bg-slate-50">
            {setJobs.length > 0 &&
              activeInterest === "" &&
              jobs.map((job, index) => (
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
                    <div>
                      <h3>Applications: 50</h3>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between text-right">
                    <div>{moment(job.createdAt).format("MM/DD/YYYY")}</div>
                    <div className="flex items-center justify-end space-x-5">
                      <Tippy content="View" inertia animation="scale">
                        <button className="border-[1px] border-black p-2">
                          <VisibilityIcon />
                        </button>
                      </Tippy>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
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
    </>
  );
};

export default Applicant;
