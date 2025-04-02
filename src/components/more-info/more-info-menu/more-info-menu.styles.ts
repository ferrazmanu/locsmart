import isPropValid from "@emotion/is-prop-valid";
import { motion } from "framer-motion";
import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 4;
`;

export const Wrapper = styled(motion.div).withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  width: fit-content;
  border: 1px solid ${({ theme }) => theme.colors.grays._50};
  background: ${({ theme }) => theme.colors.white};
  z-index: 10;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  &::before {
    content: "";
    z-index: -1;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.white};
    border-left: 1px solid ${({ theme }) => theme.colors.grays._50};
    border-top: 1px solid ${({ theme }) => theme.colors.grays._50};
    display: block;
    transform: rotate(45deg);
    position: absolute;
    top: -11px;
    right: 2.5rem;
    box-shadow: rgba(99, 99, 99, 0.2) -3px -3px 5px -2px;
  }
`;

export const Line = styled.div`
  display: flex;
  padding: 0px 16px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  height: 40px;
  gap: 4px;
  opacity: 0.7;

  cursor: pointer;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.grays._50};
  }
`;

export const Label = styled.p`
  color: ${({ theme }) => theme.colors.primary} !important;
  font-size: ${({ theme }) => theme.sizes._12} !important;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;

  svg {
    width: 15px;
    height: 15px;
  }
`;
