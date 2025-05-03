import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 8px;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 14px;

  span {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
  }
`;

export const Progress = styled.progress.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  -webkit-appearence: none;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
  }
  &::-webkit-progress-value {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
