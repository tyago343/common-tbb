import React from "react";
import { StyledButton } from "./styles";

const Button = ({ handleClick, children }) => {
  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};
export default Button;
