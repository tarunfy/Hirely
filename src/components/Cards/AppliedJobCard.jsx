import moment from "moment";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const AppliedJobCard = ({ job }) => {
  return (
    <div className="relative px-3 py-10 bg-white shadow-material hover:shadow-material2  hover:-translate-y-1 transition-all ease-in-out duration-300 w-full h-56  rounded-sm">
      <Tippy content="Applied on" inertia animation="scale">
        <p className="absolute cursor-default top-2 font-medium right-2">
          {moment(job.applications[0].appliedOn).format("MM/DD/YYYY")}
        </p>
      </Tippy>
      <div>
        <h1 className="text-2xl font-bold">{job.jobTitle}</h1>
        <p className="text-sm font-semibold max-w-sm text-gray-600">
          {job.jobDescription}
        </p>
        <div className="flex mt-2 mb-7 items-center space-x-1 justify-start flex-wrap">
          {job.jobTags.map((tag, index) => (
            <div
              key={index}
              className="bg-secondary-500 text-white text-xs font-normal rounded-full p-[.4rem]"
            >
              <p>#{tag}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute cursor-default bottom-2 font-medium right-2">
        <Tippy content="Status" inertia animation="scale">
          <p className="group relative inline-flex border border-secondary-600 focus:outline-none  lg:ml-4 lg:inline-flex">
            <span className="w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-sm text-secondary-600 text-center font-medium  bg-white ring-1 ring-secondary-600 ring-offset-1">
              {!job.applications[0]?.status
                ? "Pending"
                : job.applications[0]?.status}
            </span>
          </p>
        </Tippy>
      </div>
    </div>
  );
};

export default AppliedJobCard;
