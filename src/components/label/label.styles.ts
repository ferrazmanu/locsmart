import { styled } from "styled-components";

export const LabelStyles = styled.label`
  font-size: ${({ theme }) => theme.sizes._14};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  line-height: 1.2;
`;
