import { styled } from "styled-components";

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.sizes._12};
  font-style: italic;
  margin-left: 8px;
`;
