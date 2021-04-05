import React from "react";
import PropTypes from "prop-types";
import { InputWrapper } from "./styles";

const Input = ({ handleChange, label, value, type, name }) => {
  return (
    <InputWrapper>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        defaultValue={value}
        onChange={handleChange}
      />
    </InputWrapper>
  );
};
Input.propTypes = {
  handleChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
};
export default Input;
