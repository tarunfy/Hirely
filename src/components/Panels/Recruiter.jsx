import JobCard from "../JobCard";
import AddIcon from "@mui/icons-material/Add";

const Recruiter = () => {
  return (
    <div className="flex flex-col justify-start items-center pt-28 px-16 bg-slate-50 h-screen w-full">
      <div className="top flex justify-between items-center w-full">
        <h1 className="text-5xl font-bold">Your Job Openings</h1>
        <button className="uppercase font-medium border-[1px] hover:scale-95 hover:bg-secondary-500 hover:text-white hover:shadow-xl hover:shadow-secondary-300 transition-all ease-in-out duration-300 flex items-center border-secondary-500 text-xl px-5 py-2 text-secondary-500">
          <AddIcon className="mr-1" />
          Add
        </button>
      </div>
      <div className="bottom w-full overflow-y-scroll  px-10 mt-20">
        <ul className="w-full border-[1px] border-zinc-500 rounded-md bg-slate-50">
          <JobCard />
        </ul>
      </div>
    </div>
  );
};

export default Recruiter;
