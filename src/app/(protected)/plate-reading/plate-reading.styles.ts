import styled, { css } from "styled-components";

export const ChangeButtonsWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  hr {
    width: 1px;
    height: 100%;
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.primary};
    margin: 0;
    border: none;
  }
`;

export const ButtonOption = styled.button<{ selected: boolean }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    ${({ selected, theme }) =>
      selected
        ? css`
            color: ${theme.colors.primary};
          `
        : css`
            color: ${theme.colors.grays._100};
          `}
  }

  &:hover {
    svg {
      fill: ${({ theme }) => theme.colors.grays._400};
    }
  }
`;
