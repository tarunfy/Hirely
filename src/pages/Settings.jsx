import { useContext } from "react";
import NavigationBar from "../components/NavigationBar/NavigationBar";
import { AuthContext } from "../contexts/AuthContext";
import { RiLogoutBoxRLine } from "react-icons/ri";

const Settings = () => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <div className=" text-3xl bg-slate-50 h-screen flex justify-center flex-col items-center">
        <p>Settings</p>
        <button
          onClick={logout}
          className="border-[1px] rounded-md px-2 py-1 mt-4 border-secondary-500 text-xl text-secondary-500 font-medium flex justify-center items-center"
        >
          <RiLogoutBoxRLine className="h-5 w-5 mr-1" />
          Logout
        </button>
      </div>
      <NavigationBar />
    </>
  );
};

export default Settings;
