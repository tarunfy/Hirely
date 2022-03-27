import { useContext } from "react";
import NavigationBar from "../components/Navbar";
import { AuthContext } from "../contexts/AuthContext";
import RecruiterProfile from "../components/Profiles/RecruiterProfile";
import ApplicantProfile from "../components/Profiles/ApplicantProfile";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <NavigationBar />
      <div className="pt-28 px-16 bg-slate-50 h-screen w-full">
        {currentUser.role === "Recruiter" ? (
          <RecruiterProfile />
        ) : (
          <ApplicantProfile />
        )}
      </div>
    </>
  );
};

export default Profile;
