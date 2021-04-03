import React from "react";
import Button from "../Button";
import logo from "./images/tbb-logo.webp";
import { HeaderWrapper } from "./styles";

const Header = () => {
  return (
    <HeaderWrapper>
      <img src={logo} alt="tbb agency" />
      <Button>Agrega una contraseña</Button>
    </HeaderWrapper>
  );
};
export default Header;
