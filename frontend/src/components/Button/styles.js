import styled from "styled-components";

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: transparent;
  min-width: 150px;
  border-radius: 4px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  font-family: Roboto-Bold;
  font-size: 17px;
  font-weight: 700;
  color: #ff3b86;
  transition: all 1s;
  border: 2px solid #ff3b86;
  cursor: pointer;
  &:hover {
    background-color: #ff3b86;
    color: #fff;
    text-decoration: none;
  }
`;
