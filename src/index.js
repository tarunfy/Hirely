import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { JobProvider } from "./contexts/JobContext";

ReactDOM.render(
  <JobProvider>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </JobProvider>,
  document.getElementById("root")
);
