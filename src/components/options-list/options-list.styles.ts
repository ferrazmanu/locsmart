import styled, { css } from "styled-components";
import { TSide } from "../tooltip/tooltip.interfaces";
import { OptionsListMenu } from "./options-list-menu/options-list-menu";
import { IOption } from "./options-list.interfaces";

export const WrapperIconOptionsListContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;

  > div {
    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledOptionsList = styled(OptionsListMenu)<{
  options: IOption[];
  boxSide?: TSide;
  openOptionsList: boolean;
}>`
  position: absolute;
  top: calc(50% + 25px);
  right: calc(50% - 50px);

  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.boxSide &&
    css`
      right: -8px !important;

      &::before {
        right: 11px !important;
      }
    `}

  ${(props) =>
    props.openOptionsList
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}

  @media (max-width: 800px) {
    right: calc(50% - 48px);
  }

  @media (max-width: 560px) {
    right: calc(50% - 45px);
  }

  @media (max-width: 480px) {
    right: calc(50% - 44px);
  }
`;

export const IconContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  cursor: pointer;
  height: inherit;
`;
