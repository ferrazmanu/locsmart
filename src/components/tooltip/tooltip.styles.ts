import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";
import { ITooltipStyles } from "./tooltip.interfaces";

const OVERFLOWED_STYLES = css`
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  display: inline-block;
  width: inherit;
`;

export const TooltipWrapper = styled.a.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<ITooltipStyles>`
  position: relative;
  display: inline-block;
  max-width: fit-content;
  width: 100%;
  white-space: nowrap;

  .content {
    ${(props) => props.overflowed && OVERFLOWED_STYLES}
  }

  .tooltiptext {
    display: none;
    background-color: ${({ theme }) => theme.colors.grays._400};
    text-align: center;
    white-space: nowrap;
    margin: 0;
    border: none;
    position: relative;
    text-decoration: none;

    position: absolute;
    z-index: 1;
    opacity: 0.9;
    flex-direction: row;
    padding: 0.5rem 0.7rem;
    border-radius: 4px;
    transform: translateY(5px);
    outline: inherit;
    transition: background 350ms ease-in-out, transform 150ms ease;
    user-select: none;
    line-height: inherit;

    font-weight: 400;

    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.sizes._12};

    top: 90%;
    transition-delay: 1s;

    ${(props) =>
      props.side === "right"
        ? css`
            right: 0;
          `
        : css`
            left: 0;
            top: 90%;
          `}
  }

  &:hover .tooltiptext {
    display: inline-block;
  }
`;
