import React, {useEffect, useState} from "react";
import { HomeWrapper } from "./styles";
import { fetchEntries } from "./utils";
const Home = () => {
  const [entries, setEntries] = useState([])
  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchEntries();
      if(entries) setEntries(entries);
    }
    getEntries();
  }, []);
  return (
    <HomeWrapper>
      <section>
        <input />
      </section>
      <section>
        <table>{entries && entries.map(enrty => <p>{enrty.application}</p>)}</table>
      </section>
    </HomeWrapper>
  );
};
export default Home;
