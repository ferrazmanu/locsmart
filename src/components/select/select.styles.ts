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
  position: absolute;
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
  cursor: pointer;

  input {
    height: 100%;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grays._50};
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const SelectWrapper = styled.div.withConfig({
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

  font-size: ${({ theme }) => theme.sizes._14};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;

  width: 100%;

  .header {
    display: flex;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 4px 8px 4px 16px;
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
          `
        : css`
            border: 1px solid
              ${props.error
                ? props.theme.colors.danger
                : props.theme.colors.grays._100};
          `}
  }

  .expand-icon {
    max-width: 24px;
    height: 100%;
    max-height: 24px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HeaderTitle = styled.div<{ selected: boolean }>`
  color: ${({ selected, theme }) =>
    selected ? theme.colors.grays._900 : theme.colors.grays._400};
  opacity: ${({ selected }) => (selected ? "1" : "0.6")};
`;

export const NoItems = styled.div`
  color: ${({ theme }) => theme.colors.grays._100};
  font-size: ${({ theme }) => theme.sizes._14};
  padding: 12px;
`;
