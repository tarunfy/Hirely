import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";
import NavigationBar from "../components/NavigationBar/NavigationBar";

const Dashboard = () => {
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
        <div className="grid grid-cols-2 gap-x-7">
          <div className="w-full bg-slate-50 shadow-material2 h-full rounded-xl flex flex-col justify-start py-4 px-8">
            <h1 className="text-2xl font-extrabold">Job Openings's Stats</h1>
            <hr className="w-full bg-slate-500 h-[1px] mt-3 mb-10" />
            <div className="flex w-full justify-between">
              <div className="flex justify-center items-start space-y-3 flex-col">
                <h1 className="font-normal text-[1.5rem]">
                  Total job applications :
                </h1>
                <h1 className="font-normal text-[1.5rem]">
                  Total applications accepted :
                </h1>
                <h1 className="font-normal text-[1.5rem]">
                  Total applications rejected :
                </h1>
                <h1 className="font-normal text-[1.5rem]">
                  Total applications pending :
                </h1>
              </div>
              <div className="flex justify-center items-center flex-col space-y-3 text-gray-500">
                <p className="font-normal text-[1.5rem]">10</p>
                <p className="font-normal text-[1.5rem]">5</p>
                <p className="font-normal text-[1.5rem]">3</p>
                <p className="font-normal text-[1.5rem]">2</p>
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-50 shadow-material2 py-4 px-8 h-full rounded-2xl overflow-y-scroll">
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
        <div className="w-full bg-slate-50 shadow-material2 h-full rounded-xl"></div>
      </div>
    </>
  );
};

export default Dashboard;
