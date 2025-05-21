import Link from "next/link";
import { styled } from "styled-components";

export const CustomLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.sizes._14};
  font-weight: 500;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
`;
