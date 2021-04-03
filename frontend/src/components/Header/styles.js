import styled from "styled-components";
import { Colors } from "../../css-variables";
export const HeaderWrapper = styled.header`
  padding: 20px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${Colors.violet};
  .img{
    height: 75px;
  }
`;
