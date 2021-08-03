import styled from "@emotion/styled/macro";
import * as colors from "styles/colors";

const inputStyles = {
  border: 0,
  borderRadius: 0,
  borderBottom: `1px solid ${colors.royalPurple}`,
  fontSize: "17px",
  backgroundColor: "transparent",
  color: colors.malibu,
  fontFamily: "roboto-regular",
  ":focus": {
    outline: "none",
  },
};
const Input = styled.input(inputStyles);

const FormGroup = styled.div({
  display: "flex",
  flexDirection: "column",
  marginBottom: "20px",
});
const Button = styled.button({
  textAlign: "center",
  padding: "5px 25px",
  fontFamily: "roboto-bold",
  color: colors.base,
  borderRadius: "5px",
  fontSize: "18px",
  backgroundColor: colors.wildStrawberry,
  borderColor: colors.wildStrawberry,
  cursor: "pointer",
  display: "block",
  margin: "auto",
});
export { Input, FormGroup, Button };
