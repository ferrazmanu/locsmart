import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

export const MainContainer = styled.main.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  padding: 10px;

  @media only screen and (max-width: 992px) {
    padding-left: 10px !important;
  }
`;
