import { useState, useContext, useEffect } from "react";
import { JobContext } from "../../contexts/JobContext";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../Spinner";
import { Modal, Select, Chip, FormControl, Box, MenuItem } from "@mui/material";

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

  const { addInterests, isLoading } = useContext(JobContext);
  const { currentUser, setCurrentUser } = useContext(AuthContext);

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

  const closeInterestModal = () => {
    setAddInterestsModal(false);
    checkInterest();
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addInterests(interests, currentUser);
    setInterests([]);
    setAddInterestsModal(false);
    checkInterest();
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="flex flex-col justify-start items-center pt-28 px-16 bg-slate-50 h-screen w-full"></div>
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
