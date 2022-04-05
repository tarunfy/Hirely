import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import {
  Home,
  Signin,
  Signup,
  Dashboard,
  Profile,
  JobDetails,
  Applications,
  AppliedJobs,
} from "./pages";

function App() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={(props) =>
            !currentUser ? <Home {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/signin"
          render={(props) =>
            !currentUser ? <Signin {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/signup"
          render={(props) =>
            !currentUser ? <Signup {...props} /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            currentUser ? <Dashboard {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/profile"
          render={(props) =>
            currentUser ? <Profile {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/applied-jobs"
          render={(props) =>
            currentUser && currentUser.role === "Applicant" ? (
              <AppliedJobs {...props} />
            ) : (
              <Redirect to="/dashboard" />
            )
          }
        />
        <Route
          exact
          path="/applications/:jobId"
          render={(props) =>
            currentUser && currentUser.role === "Recruiter" ? (
              <Applications {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
        <Route
          exact
          path="/job-details/:jobId"
          render={(props) =>
            currentUser ? <JobDetails {...props} /> : <Redirect to="/sigin" />
          }
        />
      </Switch>
    </>
  );
}

export default App;
