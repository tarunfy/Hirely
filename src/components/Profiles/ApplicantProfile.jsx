import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  Avatar,
  Chip,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";

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

const ApplicantProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [interests, setInterests] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState("");

  const { currentUser, updateUserProfile, isLoading, setIsLoading } =
    useContext(AuthContext);

  const imageHandler = (e) => {
    if (e.target.files[0].type.includes("image")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setProfilePhoto(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      toast.error("Please select an image 😩");
      return;
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setInterests(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    setIsLoading(true);
    setFullName(currentUser.fullName);
    setDob(currentUser.dob);
    setPhoneNumber(currentUser.phoneNumber);
    setExperienceLevel(currentUser.experienceLevel);
    setGender(currentUser.gender);
    setInterests(currentUser.interests);
    setProfilePhoto(currentUser.profilePhoto);
    setIsLoading(false);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUserProfile({
      fullName,
      dob,
      experienceLevel,
      gender,
      profilePhoto,
      phoneNumber,
      interests,
    });
  };
  if (isLoading) return <Spinner />;

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <form
        className="p-1 space-y-10 mt-10 flex flex-col items-center"
        onSubmit={handleUpdate}
      >
        <div className="border-2 relative border-gray-500 rounded-full">
          <Avatar className="!h-32 !w-32" src={profilePhoto} />
          <label htmlFor="icon-button-file">
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              className="!hidden"
              onChange={(e) => imageHandler(e)}
            />
            <Tippy
              inertia
              animation="scale"
              placement="bottom-start"
              content="Update Photo"
            >
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                className="!absolute !top-24 !-right-2 !text-secondary-500 !p-1.5 !bg-white"
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tippy>
          </label>
        </div>

        <div className="space-y-10">
          <div className="flex justify-between items-center space-x-24 ">
            <div className="input-container flex flex-col justify-between items-start">
              <label
                htmlFor="fullName"
                className="text-sm text-gray-900 font-light"
              >
                Full Name
              </label>
              <input
                type="text"
                autoComplete="off"
                required
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
              />
            </div>
            <div className="input-container flex flex-col justify-between items-start">
              <label htmlFor="dob" className="text-sm text-gray-900 font-light">
                Dob
              </label>
              <input
                type="date"
                autoComplete="off"
                required
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
              />
            </div>
          </div>

          <div className="flex justify-between items-center space-x-24">
            <div className="input-container flex flex-col justify-between items-start">
              <label
                htmlFor="phoneNumber"
                className="text-sm text-gray-900 font-light"
              >
                Phone Number
              </label>
              <input
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                autoComplete="off"
                required
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
              />
            </div>
            <div className="input-container flex flex-col justify-between items-start">
              <label
                htmlFor="gender"
                className="text-sm text-gray-900 font-light"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="none" selected disabled>
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between items-center space-x-24">
            <div className="input-container flex flex-col justify-between items-start">
              <label
                htmlFor="experienceLevel"
                className="text-sm text-gray-900 font-light"
              >
                Experience Level
              </label>
              <input
                type="number"
                autoComplete="off"
                required
                id="experienceLevel"
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
              />
            </div>
            <div className="input-container flex flex-col justify-between items-start">
              <label
                htmlFor="interests"
                className="text-sm text-gray-900 font-light"
              >
                Interests
              </label>
              <FormControl>
                <Select
                  id="interests"
                  multiple
                  required
                  autoComplete="off"
                  value={interests}
                  onChange={handleChange}
                  className="!bg-white font-normal text-lg focus:!outline-secondary-400 !border !border-slate-500"
                  variant="filled"
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
          </div>

          <div></div>
        </div>

        <button
          className="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex"
          type="submit"
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-sm text-secondary-600 text-center font-medium  bg-white ring-1 ring-secondary-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
            Update Profile
          </span>
        </button>
      </form>
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
    </div>
  );
};

export default ApplicantProfile;
