import { css, styled } from "styled-components";

interface StylesProps {
  active: boolean;
  disabled: boolean;
}

export const ToggleWrapper = styled.div<StylesProps>`
  display: flex;
  align-items: center;
  gap: 4px;

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.7;
      cursor: not-allowed;

      .checkbox {
        cursor: not-allowed;
      }
    `}

  .label {
    color: ${({ theme }) => theme.colors.grays._800};
    font-size: ${({ theme }) => theme.sizes._12};
    font-weight: 400;
    line-height: 20px;
  }

  .button {
    width: 60px;
    height: 33px;
    border: 1px solid ${({ theme }) => theme.colors.white};
    border-radius: 20px;
    position: relative;

    ${(props) =>
      props.active
        ? css`
            background-color: ${({ theme }) => theme.colors.primary};
          `
        : css`
            background-color: ${({ theme }) => theme.colors.grays._100};
          `}
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
    color: #000;
  }

  .checkbox:checked + .knobs:before {
    content: "";
    left: 30px;
  }

  .knobs {
    z-index: 2;
    transition: 0.3s ease all;

    &:before {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 25px;
      height: 25px;
      color: ${({ theme }) => theme.colors.white};
      font-size: 10px;
      font-weight: bold;
      text-align: center;
      background-color: ${({ theme }) => theme.colors.white};
      border-radius: 50%;
      transition: 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15) all;
    }
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }
`;
