import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";
import { IInputStyles } from "./input.interfaces";

export const DefaultInputStyles = css<IInputStyles>`
  border: solid 1px
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.grays._100};
  height: 40px;
  color: ${({ theme }) => theme.colors.grays._900};
  width: 100%;
  overflow: hidden;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.6;
  }

  ::-webkit-input-placeholder {
    color: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.6;
  }

  ::-moz-placeholder {
    color: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.6;
  }

  :-ms-input-placeholder {
    color: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.6;
  }

  :-moz-placeholder {
    color: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.6;
  }

  input[type="password"]::-ms-reveal,
  input[type="password"]::-ms-clear {
    display: none;
  }

  input {
    width: 100%;
    padding: 6px 16px;
    border: none;
    background-color: transparent;
    height: 100%;
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 400;

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.grays._50};
    }
  }
`;

export const InputStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IInputStyles>`
  ${DefaultInputStyles}
`;

export const DateInputStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IInputStyles>`
  width: 100%;
  position: relative;
  overflow: visible !important;

  .react-datepicker {
    text-transform: capitalize;
  }

  .react-datepicker__day--selected {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #f582206b;
  }

  .react-datepicker-popper {
    z-index: 2;
  }

  .react-datepicker-wrapper,
  .react-datepicker__input-container {
    width: 100%;
    height: 100%;
  }

  .calendar-icon {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 15%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;

    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  ${DefaultInputStyles};

  input {
    width: 100%;
    padding-right: 12% !important;
  }

  .input-wrapper {
    height: inherit;
  }
`;

export const MaskedInputStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IInputStyles>`
  width: 100%;

  ${DefaultInputStyles}
`;

export const PasswordIcon = styled.i`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grays._100};
  font-size: 20px;
  height: inherit;
  width: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.grays._70};
`;

export const PasswordContainer = styled.div<IInputStyles>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  border: solid 1px
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.grays._100};

  .input-wrapper {
    border: none;
  }
`;
