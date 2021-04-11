import React, {useState, useEffect} from "react";
import { fetchEntries } from "../../utils";
import { HomeWrapper } from "./styles";
const Home = () => {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    const getEntries = async () => {
      const entries = await fetchEntries();
      if (entries) setEntries(entries);
    };
    getEntries();
  }, []);
  return (
    <HomeWrapper>
      <section>
        <input />
      </section>
      <section>
        <table>{entries && entries.map(entry => <p>{entry.application}</p>)}</table>
      </section>
    </HomeWrapper>
  );
};
export default Home;
