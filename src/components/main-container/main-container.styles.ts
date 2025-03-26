import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

export const MainContainer = styled.main.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ showInterface: boolean }>`
  ${(props) =>
    props.showInterface
      ? css`
          width: 100%;
          height: 100%;
          padding: 75px 10px 10px 10px;
        `
      : css`
          padding: 10px;
        `}

  @media only screen and (max-width: 992px) {
    padding-left: 10px !important;
  }
`;
