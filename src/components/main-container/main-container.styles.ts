import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { DRAWER_MENU_WIDTH } from "../drawer-menu/drawer-menu.styles";

export const Wrapper = styled.main.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ showInterface: boolean; menuOpen: boolean }>`
  ${(props) =>
    props.showInterface
      ? css`
          width: 100%;
          height: 100%;
          ${props.menuOpen
            ? `padding: 75px 10px 10px ${DRAWER_MENU_WIDTH + 10}px;`
            : `padding: 75px 10px 10px 10px;`}
        `
      : css`
          padding: 10px;
        `}

  @media only screen and (max-width: 992px) {
    padding-left: 10px !important;
  }
`;
