import styled from "styled-components";

export const FLAG_HEIGHT = 24;

export const Flag = styled.div`
  width: 100%;
  padding: 4px;
  height: ${FLAG_HEIGHT}px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.sizes._12};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.danger};
  position: fixed;
  top: 0;
  left: 0;
  font-weight: 500;
`;
