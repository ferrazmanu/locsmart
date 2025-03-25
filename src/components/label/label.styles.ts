import { styled } from "styled-components";

export const LabelStyles = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.2;
`;
