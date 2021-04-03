import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./styles";

const Button = ({ handleClick, children }) => {
  return <StyledButton onClick={handleClick}>{children}</StyledButton>;
};
Button.propTypes = {
  handleClick: PropTypes.func,
  children: PropTypes.string,
};
export default Button;
