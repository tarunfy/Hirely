import { Avatar, Modal } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { JobContext } from "../contexts/JobContext";
import Spinner from "./Spinner";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/system";

const ApplicationCard = ({ applicantId, applicationStatus }) => {
  const [applicantDetails, setApplicantDetails] = useState(null);
  const [status, setStatus] = useState(applicationStatus);

  const [viewMoreModal, setViewMoreModal] = useState(false);

  const { fetchApplicant, isLoading } = useContext(JobContext);

  useEffect(() => {
    async function getApplicant() {
      const details = await fetchApplicant(applicantId);
      setApplicantDetails(details);
    }
    getApplicant();
  }, []);

  const closeViewMoreModal = () => {
    setViewMoreModal(false);
  };

  const openViewMoreModal = () => {
    setViewMoreModal(true);
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="shadow-material p-4 space-y-3 bg-white/90">
        <div className="space-y-1">
          <div className="flex justify-center flex-col items-center space-y-1">
            <Avatar
              src={applicantDetails?.profilePhoto}
              className="!h-16 !w-16 !border-gray-500 !border-[1px]"
            />
            <p className="text-lg text-secondary-600 font-bold">
              {applicantDetails?.fullName}
            </p>
          </div>
          <div>
            <p className="text-center font-light text-sm">
              {applicantDetails?.about}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <Tippy content="View more" inertia animation="scale">
            <button
              onClick={() => setViewMoreModal(true)}
              className="p-1 font-normal focus:outline-secondary-400 border border-slate-500"
            >
              <VisibilityIcon className="!h-6 !w-6" />
            </button>
          </Tippy>

          <Tippy content="Application status" inertia animation="scale">
            <select
              name="application-status"
              id="application-status"
              className="p-1 font-normal text-sm text-black bg-transparent focus:outline-secondary-400 border border-slate-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="" selected disabled hidden>
                Status
              </option>
              <option value="Pending">Pending</option>
              <option value="In process">In process</option>
              <option value="Contacted">Contacted</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </Tippy>
        </div>
      </div>
      <Modal
        open={viewMoreModal}
        onClose={closeViewMoreModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex h-screen w-full items-center justify-center"
      >
        <Box className="p-6 rounded-md h-[85%] overflow-y-scroll bg-slate-50 w-[40%] border-none outline-none focus:outline-none ">
          <h1 className="text-[2rem] text-center font-semibold">Update Job</h1>
          <hr className="bg-slate-400 h-[2px] w-full mb-4" />
        </Box>
      </Modal>
    </>
  );
};

export default ApplicationCard;
