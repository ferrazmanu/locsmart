import styled from "styled-components";

interface IPageButton {
  selected: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const Button = styled.button`
  background: transparent;
  border: 0;
  padding: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  svg {
    font-size: 1rem;

    fill: ${({ theme }) => theme.colors.grays._100};
  }

  &:disabled {
    cursor: not-allowed;

    svg {
      fill: ${({ theme }) => theme.colors.grays._100};
    }
  }
`;

export const Page = styled.button<IPageButton>`
  border: 0;

  background: ${({ theme, selected }) =>
    selected ? theme.colors.grays._100 : "transparent"};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.white : theme.colors.primary};

  border-radius: 4px;
  padding: 0.2rem 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 600;
  font-size: ${({ theme }) => theme.sizes._16};

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
