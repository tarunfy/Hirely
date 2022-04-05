import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Spinner } from "../index";
import { Avatar, Button, IconButton, Input } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const RecruiterProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState("");
  const [fullName, setFullName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");

  const { currentUser, updateUserProfile, isLoading, updateCurrentUser } =
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

  useEffect(() => {
    setFullName(currentUser.fullName);
    setCompanyName(currentUser.company);
    setPhoneNumber(currentUser.phoneNumber);
    setDesignation(currentUser.designation);
    setProfilePhoto(currentUser.profilePhoto);
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await updateUserProfile({
      fullName,
      company: companyName,
      designation,
      profilePhoto,
      phoneNumber,
    });
    const data = await updateCurrentUser();
    if (res.error || data.error) {
      toast.error("Error updating the profile 😭");
    } else {
      toast.success("Profile updated successfully 😎");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="h-full w-full flex flex-col justify-start relative items-center">
      <Link
        to="/dashboard"
        className="absolute top-0 left-0 hover:scale-95 transition-transform ease-in-out"
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackOutlinedIcon />}
          className="!border-[1px] !normal-case !border-gray-600 hover:!bg-transparent !text-black"
        >
          Home
        </Button>
      </Link>
      <form
        className="p-1 space-y-10 mt-10 flex flex-col items-center"
        onSubmit={handleUpdate}
      >
        <div className="border-2 relative border-gray-500 rounded-full">
          <Tippy content="Remove photo">
            <div className="cursor-pointer" onClick={() => setProfilePhoto("")}>
              <Avatar className="!h-32 !w-32 " src={profilePhoto} />
            </div>
          </Tippy>
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
              <label
                htmlFor="companyName"
                className="text-sm text-gray-900 font-light"
              >
                Company Name
              </label>
              <input
                type="text"
                autoComplete="off"
                required
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
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
                htmlFor="desgination"
                className="text-sm text-gray-900 font-light"
              >
                Designation
              </label>
              <input
                type="text"
                autoComplete="off"
                required
                id="designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="p-2 font-normal text-lg placeholder:text-zinc-800 focus:outline-secondary-400 border border-slate-500"
              />
            </div>
          </div>
        </div>
        <button
          className="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex"
          type="submit"
        >
          <span className="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-lg text-secondary-600 text-center font-medium  bg-white ring-1 ring-secondary-600 ring-offset-1 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
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

export default RecruiterProfile;
