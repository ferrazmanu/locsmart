import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";

export const List = styled.ul.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ error?: boolean; listOpen: boolean }>`
  min-width: 100%;
  width: 100%;
  border-top: none;
  background-color: ${({ theme }) => theme.colors.white};
  left: 0;
  z-index: 9;
  position: sticky;
  top: 100%;
  max-height: 200px;
  overflow-y: auto;

  ${(props) =>
    props.listOpen
      ? css`
          border: 1px solid
            ${props.error
              ? props.theme.colors.danger
              : props.theme.colors.grays._100};
          border-top: none;
        `
      : css`
          border: none;
        `}

  ${SCROLLBAR_STYLE}
`;

export const ListItem = styled.li`
  padding: 12px;

  &:not(.empty) {
    cursor: pointer;
  }

  input {
    height: 100%;
  }

  &:hover:not(.empty) {
    background-color: ${({ theme }) => theme.colors.grays._50};
    color: ${({ theme }) => theme.colors.black};
  }

  &.new-option {
    display: flex;
    gap: 4px;

    .input-wrapper {
      height: 36px;
    }

    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      max-width: 36px;
      width: 100%;
      border: 1px solid ${({ theme }) => theme.colors.grays._100};
      display: flex;
      justify-content: center;
      align-items: center;
      height: 36px;

      svg {
        fill: ${({ theme }) => theme.colors.grays._400};
        stroke: ${({ theme }) => theme.colors.grays._400};
      }

      &:hover {
        svg {
          fill: ${({ theme }) => theme.colors.primary};
          stroke: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }
`;

export const MultiSelectWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{
  disabled: boolean;
  listOpen: boolean;
  error?: string;
}>`
  ${(props) =>
    props.disabled
      ? css`
          opacity: 0.7;
          background-color: ${props.theme.colors.grays._70};
        `
      : css`
          opacity: 1;
          background-color: ${({ theme }) => theme.colors.white};
        `}

  color: ${({ theme }) => theme.colors.primary};

  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  width: 100%;

  .header {
    display: flex;
    min-height: 30px;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 16px;
    min-height: 40px;
    gap: 8px;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    ${(props) =>
      props.listOpen
        ? css`
            border: 1px solid
              ${props.error
                ? props.theme.colors.danger
                : props.theme.colors.grays._100};
            border-bottom: none;
            border-bottom-right-radius: 0px;
            border-bottom-left-radius: 0px;
          `
        : css`
            border: 1px solid
              ${props.error
                ? props.theme.colors.danger
                : props.theme.colors.grays._100};
          `}
  }

  &.max-content {
    width: max-content;

    @media only screen and (max-width: 1200px) {
      width: 100%;
    }
  }
`;

export const HeaderTitle = styled.div<{ selected: boolean }>`
  color: ${({ theme }) => theme.colors.grays._400};
  opacity: ${({ selected }) => (selected ? "1" : "0.6")};
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Icons = styled.div`
  display: flex;
  gap: 4px;

  .clear-button {
    cursor: pointer;
    opacity: 0.6;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 24px;
    width: 100%;

    &:hover {
      opacity: 1;
    }
  }

  .expand-icon {
    max-width: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const SelectedBox = styled.div`
  background-color: ${({ theme }) => theme.colors.grays._70};
  display: flex;
  padding: 2px 8px;
  align-items: center;
  gap: 4px;

  span {
    white-space: nowrap;
    line-height: 1.5;
  }

  .close {
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

export const Field = styled.fieldset`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;
