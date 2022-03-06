import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import PieChart from "../components/PieChart";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { IoDocumentsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [jobStats, setJobStats] = useState({
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        data: [5, 3, 2],
        backgroundColor: ["#0ea5e9", "#dc2626", "#fbbf24"],
        borderColor: "none",
        borderWidth: 0,
      },
    ],
  });

  const { isLoading, getCurrentUser, isFetching, currentUser } =
    useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    async function fetchUser() {
      const res = await getCurrentUser();
      if (!res) {
        history.push("/add-details");
      }
    }
    fetchUser();
  }, []);

  if (isLoading || isFetching) return <Spinner />;

  return (
    <>
      <NavigationBar />
      <div className="h-screen w-full bg-slate-50 p-8 text-center gap-y-8  grid grid-rows-2">
        <div className="grid grid-cols-3 gap-x-7">
          <div className="w-full shadow-material2 h-full rounded-xl flex flex-col justify-start py-4 px-8">
            <h1 className="text-2xl font-extrabold">Job Openings's Stats</h1>
            <hr className="w-full bg-slate-500 h-[1px] my-3" />
            <div className="chart w-4/6 ml-14 mt-4 flex justify-center items-center">
              <PieChart chartData={jobStats} />
            </div>
          </div>
          <div className="w-full bg-slate-50 col-span-2 shadow-material2 py-4 px-8 h-full rounded-2xl overflow-y-scroll">
            <div className="text-center w-full text-2xl">
              <h1 className="font-extrabold">Your Job Openings</h1>
            </div>
            <hr className="w-full bg-slate-500 h-[1px] mt-3 mb-6" />
            <div>
              <ul className="list-none">
                <li className="flex justify-between items-center  py-2">
                  <div className="text-left">
                    <h1 className="text-base font-semibold">
                      Frontend Developer
                    </h1>
                    <p className="text-sm max-w-sm text-gray-700">
                      Good hands on JavasScript, TypeScript, and familiarity
                      with framworks like React, Next, Sevalte, etc.
                    </p>
                  </div>
                  <div>
                    <h1>New York</h1>
                  </div>
                </li>
                <li className="flex justify-between items-center py-2">
                  <div className="text-left">
                    <h1 className="text-base font-semibold">
                      Frontend Developer
                    </h1>
                    <p className="text-sm max-w-sm text-gray-700">
                      Good hands on JavasScript, TypeScript, and familiarity
                      with framworks like React, Next, Sevalte, etc.
                    </p>
                  </div>
                  <div>
                    <h1>New York</h1>
                  </div>
                </li>
                <li className="flex justify-between items-center  py-2">
                  <div className="text-left">
                    <h1 className="text-base font-semibold">
                      Frontend Developer
                    </h1>
                    <p className="text-sm max-w-sm text-gray-700">
                      Good hands on JavasScript, TypeScript, and familiarity
                      with framworks like React, Next, Sevalte, etc.
                    </p>
                  </div>
                  <div>
                    <h1>New York</h1>
                  </div>
                </li>
                <li className="flex justify-between items-center  py-2">
                  <div className="text-left">
                    <h1 className="text-base font-semibold">
                      Frontend Developer
                    </h1>
                    <p className="text-sm max-w-sm text-gray-700">
                      Good hands on JavasScript, TypeScript, and familiarity
                      with framworks like React, Next, Sevalte, etc.
                    </p>
                  </div>
                  <div>
                    <h1>New York</h1>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-50  shadow-material2 py-4 px-12 h-full rounded-2xl overflow-y-scroll">
          <div className="text-center w-full text-2xl">
            <h1 className="font-extrabold  flex justify-center items-center">
              Job Applications <IoDocumentsSharp className="ml-1" />
            </h1>
          </div>
          <hr className="w-full bg-slate-500 h-[1px] mt-3 mb-6" />
          <div>
            <Link
              to="/dashboard"
              className="flex justify-between  p-4 items-center rounded-xl  hover:scale-[1.04] hover:bg-slate-200 transition-all duration-300 ease-in-out"
            >
              <div className="text-left">
                <h1 className="text-lg font-bold">Jhon Doe</h1>
                <p className="max-w-xl text-base text-gray-800">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                  perspiciatis aperiam, consequatur cum saepe non soluta iusto
                  impedit architecto ratione.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">9203481759</h4>
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="flex justify-between p-4 items-center rounded-xl  hover:scale-[1.04] hover:bg-slate-200 transition-all duration-300 ease-in-out"
            >
              <div className="text-left">
                <h1 className="text-lg font-bold">Steve Jobs</h1>
                <p className="max-w-xl text-base text-gray-800">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                  perspiciatis aperiam, consequatur cum saepe non soluta iusto
                  impedit architecto ratione.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">8435625182</h4>
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="flex justify-between p-4  items-center rounded-xl  hover:scale-[1.04] hover:bg-slate-200 transition-all duration-300 ease-in-out"
            >
              <div className="text-left">
                <h1 className="text-lg font-bold">Jack Shelby</h1>
                <p className="max-w-xl text-base text-gray-800">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                  perspiciatis aperiam, consequatur cum saepe non soluta iusto
                  impedit architecto ratione.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">8973659871</h4>
              </div>
            </Link>
            <Link
              to="/dashboard"
              className="flex justify-between p-4 items-center rounded-xl  hover:scale-[1.04] hover:bg-slate-200 transition-all duration-300 ease-in-out"
            >
              <div className="text-left">
                <h1 className="text-lg font-bold">Ivan Louis</h1>
                <p className="max-w-xl text-base text-gray-800">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde
                  perspiciatis aperiam, consequatur cum saepe non soluta iusto
                  impedit architecto ratione.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">8283846712</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
