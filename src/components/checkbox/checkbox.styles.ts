import { css, styled } from "styled-components";
import { ICheckboxStyles } from "./checkbox.interfaces";

export const CheckBoxStyles = styled.div<ICheckboxStyles>`
  display: flex;
  align-items: center;
  position: relative;
  font-size: ${({ theme }) => theme.sizes._16};
  line-height: 18px;
  user-select: none;
  gap: 8px;

  ${(props) =>
    props.disabled &&
    css`
      * {
        cursor: not-allowed !important;
        opacity: 0.6;
      }
    `}
`;

export const InputCheck = styled.input`
  position: absolute;
  inset: 0;
  opacity: 0;
  height: inherit;
  width: inherit;
  margin: 0;
  z-index: 1;
  cursor: pointer;
`;

export const Check = styled.div`
  position: relative;
  height: 18px;
  max-width: 18px;
  width: 100%;

  .checkmark {
    position: absolute;
    inset: 0;
    height: 18px;
    width: 18px;
    border: solid 1px ${({ theme }) => theme.colors.grays._100};
    background-color: ${({ theme }) => theme.colors.white};
  }

  input:checked ~ .checkmark {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  input:checked ~ .checkmark:after {
    display: block;
  }

  .checkmark:after {
    left: 6px;
    top: 1px;
    width: 4px;
    height: 10px;
    border: solid ${({ theme }) => theme.colors.white};
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;
