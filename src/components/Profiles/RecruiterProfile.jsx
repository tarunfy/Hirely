import EditIcon from "@mui/icons-material/Edit";
import { Avatar, IconButton, Input } from "@mui/material";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const RecruiterProfile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="border-2 relative border-black/50 p-2 bg-white rounded-full">
        <Tippy content="Change your avatar" inertia animation="scale">
          <Avatar
            className="!h-32 !w-32 !object-cover"
            src={
              currentUser?.profilePhoto
                ? currentUser.profilePhoto
                : `https://avatars.dicebear.com/api/bottts/${currentUser.fullName}.svg`
            }
          />
        </Tippy>

        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className="!hidden"
          />
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            className="!absolute !top-28 !-right-1 !text-secondary-500 !p-1.5 !bg-white"
          >
            <EditIcon />
          </IconButton>
        </label>
      </div>
    </div>
  );
};

export default RecruiterProfile;
