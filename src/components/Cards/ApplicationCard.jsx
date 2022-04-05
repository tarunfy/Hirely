import { Avatar, IconButton, Modal } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { JobContext } from "../../contexts/JobContext";
import Spinner from "../Loader/Spinner";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box } from "@mui/system";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationCard = ({ applicantId, applicationStatus, job }) => {
  const [applicantDetails, setApplicantDetails] = useState(null);

  const [viewMoreModal, setViewMoreModal] = useState(false);

  const { fetchApplicant, isLoading, updateApplicationStatus } =
    useContext(JobContext);

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

  const handleStatus = async (e) => {
    const targetedJob = job;
    for (let i = 0; i < targetedJob.applications.length; i++) {
      if (targetedJob.applications[i].userId === applicantId) {
        targetedJob.applications[i].status = e.target.value;
      }
    }
    await updateApplicationStatus(targetedJob, job.jobId);
    const details = await fetchApplicant(applicantId);
    setApplicantDetails(details);
    toast.success(`Application status updated 🚀`);
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
              onChange={(e) => handleStatus(e)}
              value={applicationStatus}
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
        <Box className="px-6 py-10 relative rounded-md  overflow-y-scroll bg-slate-50 w-[45%] border-none outline-none focus:outline-none ">
          <IconButton
            onClick={closeViewMoreModal}
            component="span"
            className="!text-black !absolute !top-2 !right-2"
          >
            <CloseIcon />
          </IconButton>
          <div className="flex justify-center flex-col items-center space-y-4">
            <div className="flex flex-col justify-center items-center space-y-1">
              <Avatar
                src={applicantDetails?.profilePhoto}
                className="!h-20 !w-20 !border-gray-500 !border-[1px]"
              />
              <p className="text-xl tracking-wide text-secondary-600 font-semibold">
                {applicantDetails?.fullName}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-8">
              <p className="text-center text-lg text-gray-600">
                {applicantDetails?.about}
              </p>
              <div
                className="grid grid-cols-3 divide-x-2 
                    divide-gray-500 text-lg font-medium w-[80%]"
              >
                <p className="text-left">{applicantDetails?.dob}</p>
                <p className="text-center">{applicantDetails?.gender}</p>
                <p className="text-right">{applicantDetails?.phoneNumber}</p>
              </div>
              {applicantDetails?.resume ? (
                <>
                  <a
                    href={applicantDetails?.resume}
                    download={applicantDetails?.resume}
                  >
                    <button className="group relative inline-flex border border-secondary-600 focus:outline-none w-full sm:w-auto">
                      <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-lg text-white text-center font-bold  bg-secondary-600 ring-1 ring-secondary-600 ring-offset-1 ring-offset-secondary-600 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                        <FileDownloadIcon className="mr-1" />
                        Download resume
                      </span>
                    </button>
                  </a>
                </>
              ) : (
                <Tippy content="No resume found 😭" inertia animation="scale">
                  <button
                    disabled
                    className="group cursor-not-allowed relative inline-flex border border-gray-600 focus:outline-none w-full sm:w-auto"
                  >
                    <span className="w-full inline-flex items-center justify-center self-stretch px-4 py-2 text-lg text-white text-center font-bold  bg-gray-600 ring-1 ring-gray-600 ring-offset-1 ring-gray-secondary-600 transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1">
                      <FileDownloadIcon className="mr-1" />
                      Download resume
                    </span>
                  </button>
                </Tippy>
              )}
            </div>
          </div>
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

export default ApplicationCard;
