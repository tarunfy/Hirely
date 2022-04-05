import { useState, useContext } from "react";
import { Spinner, Navbar } from "../../components";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { web, business, beam } from "../../assets";

const Signup = () => {
  const [role, setRole] = useState("Recruiter");
  const [gender, setGender] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isFetching, isLoading } = useContext(AuthContext);

  const isDisabled =
    role === "Recruiter"
      ? isLoading ||
        !email ||
        !password ||
        !company ||
        !designation ||
        !phoneNumber ||
        !fullName
      : isLoading ||
        !email ||
        !password ||
        !experienceLevel ||
        !gender ||
        !phoneNumber ||
        !fullName ||
        !dob;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (role === "Recruiter") {
      const res = await signup(email, password, {
        role,
        fullName,
        company,
        designation,
        phoneNumber,
        profilePhoto: "",
      });
      if (res.error) {
        toast.error(res.error);
      }
    } else {
      const res = await signup(email, password, {
        role,
        fullName,
        gender,
        experienceLevel,
        dob,
        phoneNumber,
        profilePhoto: "",
        about: "",
        resume: "",
      });
      if (res.error) {
        toast.error(res.error);
      }
    }
  };

  const handleRole = (e) => {
    if (role == e.target.id) {
      return;
    }
    setRole(e.target.id);
    setEmail("");
    setFullName("");
    setPassword("");
    setPhoneNumber("");
    setDesignation("");
    setDob("");
    setExperienceLevel("");
    setGender("");
    setCompany("");
  };

  const handleClear = () => {
    setEmail("");
    setFullName("");
    setPassword("");
    setPhoneNumber("");
    setDesignation("");
    setDob("");
    setExperienceLevel("");
    setGender("");
    setCompany("");
  };

  if (isFetching) return <Spinner />;

  return (
    <>
      <Navbar />
      <div id="signup-container" className="absolute inset-0"></div>
      <img
        src={beam}
        alt="beam"
        className="fixed top-0 left-0 opacity-60 z-0 h-screen w-full"
      />
      <div className="flex h-screen justify-between items-center px-10">
        <div className="px-4 py-6 ml-16 w-128 rounded-lg shadow-material z-30 form-container">
          <div className="flex w-full items-center justify-evenly mb-5">
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                checked={role === "Recruiter"}
                id="Recruiter"
                onClick={(e) => handleRole(e)}
                name="role"
              />
              <label htmlFor="recruiter" className="text-xl font-medium">
                Register as recruiter
              </label>
            </div>
            <div className="flex items-center space-x-1">
              <input
                type="radio"
                id="Applicant"
                name="role"
                onClick={(e) => handleRole(e)}
                checked={role === "Applicant"}
              />
              <label htmlFor="applicant" className="text-xl font-medium">
                Register as applicant
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-container mb-5">
              <input
                type="text"
                className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                required
              />
            </div>
            <div className="input-container mb-5">
              {role === "Recruiter" ? (
                <input
                  type="text"
                  className="focus:outline-secondary-400  border-[1px] border-gray-200 p-2 w-full rounded-md"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="My Company"
                  required
                />
              ) : (
                <input
                  type="text"
                  className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  placeholder="Experience Level"
                  required
                />
              )}
            </div>
            <div className="input-container mb-5">
              {role === "Recruiter" ? (
                <input
                  type="text"
                  className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="Designation"
                  required
                />
              ) : (
                <select
                  name="gender"
                  id="gender"
                  className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" selected disabled hidden>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>
            {role === "Applicant" && (
              <div className="input-container mb-5">
                <input
                  type="date"
                  className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  placeholder="Date of birth"
                  required
                />
              </div>
            )}
            <div className="input-container mb-5">
              <input
                type="tel"
                maxLength={10}
                pattern="[0-9]{10}"
                className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="input-container mb-5">
              <input
                type="email"
                className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-container mb-5">
              <input
                type="password"
                className="focus:outline-secondary-400 border-[1px] border-gray-200 p-2 w-full rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button
              disabled={isDisabled}
              type="submit"
              className={`disabled:border-secondary-400 disabled:text-white/70 disabled:cursor-not-allowed group border-secondary-600 first-letter:selection: w-full relative border  focus:outline-none`}
            >
              <span
                className={`${
                  isDisabled
                    ? "bg-secondary-400 cursor-not-allowed ring-secondary-400 transition-none"
                    : "bg-secondary-600 ring-secondary-600 text-white cursor-pointer transform transition-transform group-hover:-translate-y-1 group-hover:-translate-x-1 group-focus:-translate-y-1 group-focus:-translate-x-1"
                } w-full inline-flex items-center justify-center self-stretch px-2 py-1 text-xl  text-center font-medium  ring-1`}
              >
                {!isLoading ? (
                  <>
                    <FaPencilAlt className="mr-1 h-4 w-4" /> Register
                  </>
                ) : (
                  <>
                    <svg
                      role="status"
                      className="mr-2 w-5 h-5 text-gray-200 animate-spin  fill-secondary-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    Registering...
                  </>
                )}
              </span>
            </button>
            <button
              onClick={handleClear}
              type="reset"
              disabled={isDisabled}
              className="flex justify-center disabled:cursor-not-allowed disabled:hover:bg-transparent items-center border-secondary-600 border-2 text-center  text-secondary-600 w-full px-2 py-1 font-medium text-xl mt-4  transition-colors duration-300 ease-in-out  hover:bg-secondary-50"
            >
              <MdDelete className="mr-1 h-5 w-5" />
              Clear
            </button>
            <p className="text-center text-base mt-4">
              Already have an account?{" "}
              <Link to="/signin" className="text-secondary-500 font-semibold">
                Sign in
              </Link>{" "}
            </p>
          </form>
        </div>
        <img
          src={role === "Recruiter" ? web : business}
          alt="img"
          className="w-[40rem] h-128 z-30"
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
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

export default Signup;
