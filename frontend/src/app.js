import React from "react";
import { UnauthenticatedApp } from "unauthenticated-app";
import "./styles/global.css";
import { client } from "utils/api";
import { useAsync } from "utils/hooks";
function App() {
  const { data, isError, isIdle, isLoading, isSuccess, run, setData } = useAsync();
  function handleSubmit(formData) {
    run(client("login", {data:formData}))
  }
  return (
      <UnauthenticatedApp login={handleSubmit}/>
  );
}
export { App };
