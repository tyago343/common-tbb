import React, { Fragment } from "react";
import {  Route, Switch, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  
  return (
    <Fragment>
      <Header />
      <Link to="/">home</Link>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </Fragment>
  );
};
export default App;
