import styled, { css } from "styled-components";
import { TSide } from "../tooltip/tooltip.interfaces";
import { MoreInfoMenu } from "./more-info-menu/more-info-menu";
import { IOption } from "./more-info.interfaces";

export const WrapperIconMoreInfoContent = styled.div`
  width: 100%;
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

export const StyledMoreInfo = styled(MoreInfoMenu)<{
  options: IOption[];
  boxSide?: TSide;
  isOpen?: boolean;
}>`
  position: absolute;
  top: calc(50% + 25px);
  right: calc(50% - 50px);

  transition: all 0.2s ease-in-out;

  ${(props) =>
    props.boxSide &&
    css`
      right: 0 !important;

      &::before {
        right: 11px !important;
      }
    `}

  ${(props) =>
    props.isOpen
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
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: inherit;
`;
