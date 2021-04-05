import React, { Fragment, useEffect, useState } from "react";
import {  Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { fetchEntries } from "./utils";

const App = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchEntries();
      if (entries) setEntries(entries);
    };
    getEntries();
  }, []);
  return (
    <Fragment>
      <Header />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Home entries={entries} />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default App;
