import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./styles/global.css";
import { client } from "utils/api";

function App() {
  function handleSubmit(formData) {}
  return (
    <div>
      <UnauthenticatedApp />
    </div>
  );
}
export { App };
