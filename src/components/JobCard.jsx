import EditIcon from "@mui/icons-material/Edit";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const JobCard = () => {
  return (
    <>
      <li className="flex hover:shadow-inner  justify-between items-stretch cursor-default p-5 duration-300 transition-all ease-in-out">
        <div className="flex flex-col justify-between text-left">
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">Title</h1>
            <h4 className="text-lg font-medium">Designation</h4>
            <p className="max-w-2xl text-base font-normal text-gray-900">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum fugit
              quis, magnam quisquam adipisci ullam.
            </p>
          </div>
          <div>
            <h3>Applications: 50</h3>
          </div>
        </div>
        <div className="flex flex-col justify-between text-right">
          <div>20 March, 2022</div>
          <div className="flex items-center justify-end space-x-5">
            <Tippy content="Edit" inertia animation="scale">
              <button className="border-[1px] border-black p-2">
                <EditIcon />
              </button>
            </Tippy>
            <Tippy content="Remove" inertia animation="scale">
              <button className="border-[1px]  border-black p-2">
                <RemoveCircleOutlineIcon />
              </button>
            </Tippy>
            <Tippy content="View" inertia animation="scale">
              <button className="border-[1px] border-black p-2">
                <VisibilityIcon />
              </button>
            </Tippy>
          </div>
        </div>
      </li>
    </>
  );
};

export default JobCard;
