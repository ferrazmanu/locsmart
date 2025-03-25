import { styled } from "styled-components";

export const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 12px;
  font-style: italic;
  margin-left: 8px;
`;
