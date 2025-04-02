import { styled } from "styled-components";

export const WarningMessage = styled.div`
  color: #8a6d3b;
  background-color: #fcf8e3;
  border: 1px solid ${({ theme }) => theme.colors.warning};
  font-size: ${({ theme }) => theme.sizes._12};
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
`;
