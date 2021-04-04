import React, { Fragment, useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import { fetchEntries } from "./utils";

const App = () => {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchEntries();
      if(entries) setEntries(entries);
    }
    getEntries();
  }, []);
  return (
    <Fragment>
      <Header />
      <Home entries={entries} />
    </Fragment>
  );
};
export default App;
