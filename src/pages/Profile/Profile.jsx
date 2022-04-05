import { useContext } from "react";
import { Navbar, RecruiterProfile, ApplicantProfile } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Navbar />
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
