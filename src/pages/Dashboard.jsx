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
      <div className="h-screen w-full bg-slate-50 text-center">
        <p className="text-6xl">Welcome {currentUser.phoneNumber} 👋🏻</p>
      </div>
    </>
  );
};

export default Dashboard;
