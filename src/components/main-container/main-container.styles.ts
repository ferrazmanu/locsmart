import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { DRAWER_MENU_WIDTH } from "../drawer-menu/drawer-menu.styles";
import { FLAG_HEIGHT } from "../env-flag/env-flag.styles";

const getTopPadding = (envFlag: boolean) => (envFlag ? FLAG_HEIGHT + 75 : 0);

const getPadding = (menuOpen: boolean, envFlag: boolean) => {
  const top = getTopPadding(envFlag);
  const right = 10;
  const bottom = 10;
  const left = menuOpen ? DRAWER_MENU_WIDTH + 10 : 10;

  return `${top}px ${right}px ${bottom}px ${left}px`;
};

export const Wrapper = styled.main.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ showInterface: boolean; menuOpen: boolean; envFlag: boolean }>`
  ${(props) =>
    props.showInterface
      ? css`
          width: 100%;
          height: 100%;
          padding: ${getPadding(props.menuOpen, props.envFlag)};
        `
      : css`
          padding: 10px;
        `}

  @media only screen and (max-width: 992px) {
    padding-left: 10px !important;
  }
`;
