import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";

import { StyledButtonProps } from "./button.interfaces";

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  padding: 8px 12px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  -webkit-font-smoothing: antialiased;
  -webkit-touch-callout: none;
  user-select: none;
  border: none;
  text-transform: uppercase;
  gap: 4px;

  border-radius: 8px;

  width: ${({ maxWidth }) => (maxWidth ? "100%" : "max-content")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};

  ${(props) =>
    props.buttonStyle === "primary"
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.secondary};
        `
      : null}

  ${(props) =>
    props.buttonStyle === "secondary"
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.tertiary};
        `
      : null}

  ${(props) =>
    props.buttonStyle === "danger"
      ? css`
          color: ${({ theme }) => theme.colors.white};
          background: ${({ theme }) => theme.colors.danger};
        `
      : null}

${(props) =>
    props.buttonStyle === "hollow"
      ? css`
          border: 2px solid
            ${props.color ? props.color : ({ theme }) => theme.colors.tertiary};
          background-color: transparent;
          color: ${props.color
            ? props.color
            : ({ theme }) => theme.colors.tertiary};
        `
      : null}
`;
