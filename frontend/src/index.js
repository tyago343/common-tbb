import React from "react";
import ReactDOM from "react-dom";
import { App } from "app";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "context/auth";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
