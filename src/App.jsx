import React, { useContext } from "react";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Details from "./pages/Details";
import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./contexts/AuthContext";

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
      </Switch>
    </>
  );
}

export default App;
