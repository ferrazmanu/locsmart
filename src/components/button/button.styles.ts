import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";

import { StyledButtonProps } from "./button.interfaces";

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  padding: 8px 12px;
  font-weight: 400;
  font-size: ${({ theme }) => theme.sizes._14};
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  border: none;
  gap: 4px;

  width: ${({ maxWidth }) => (maxWidth ? "100%" : "max-content")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  font-weight: 500;

  transition: ease-in-out 0.2s;

  ${(props) =>
    props.buttonStyle === "primary"
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.primary};

          &:hover {
            background: #2d2d2d;
          }
        `
      : null}
  ${(props) =>
    props.buttonStyle === "danger"
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.danger};

          &:hover {
            background: #d34d4e;
          }
        `
      : null}

      
    ${(props) =>
    props.buttonStyle === "hollow"
      ? css`
          border: 2px solid
            ${props.color ? props.color : ({ theme }) => theme.colors.primary};
          background-color: transparent;
          color: ${props.color
            ? props.color
            : ({ theme }) => theme.colors.primary};

          &:hover {
            border-color: #5e5e5e;
          }
        `
      : null};

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  }
`;
