import { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Details from "./pages/Details";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ApplicantsList from "./pages/ApplicantsList";

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
          path="/add-details"
          render={(props) =>
            currentUser ? <Details {...props} /> : <Redirect to="/signin" />
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
          path="/settings"
          render={(props) =>
            currentUser ? <Settings {...props} /> : <Redirect to="/signin" />
          }
        />
        <Route
          exact
          path="/applicants"
          render={(props) =>
            currentUser ? (
              <ApplicantsList {...props} />
            ) : (
              <Redirect to="/signin" />
            )
          }
        />
      </Switch>
    </>
  );
}

export default App;
