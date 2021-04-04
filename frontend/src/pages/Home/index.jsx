import React from "react";
import { HomeWrapper } from "./styles";
const Home = ({entries}) => {
  
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
