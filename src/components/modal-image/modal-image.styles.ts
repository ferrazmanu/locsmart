import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import { motion } from "framer-motion";
import Image from "next/image";
import styled, { css } from "styled-components";

const surroundPadding = css`
  padding: 1rem 2rem;

  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
`;

export const BackgroundOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 12;
  background: rgba(0, 0, 0, 0.5);

  transform-origin: center;
`;

export const Wrapper = styled(motion.div)<{ $size?: string }>`
  width: ${(props) => props.$size};
  max-height: 90vh;
  height: auto;

  background: #fff;
  box-shadow: 0px 16px 64px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  overflow: hidden;

  transition: all 0.3s ease-in-out;

  @media only screen and (max-width: 600px) {
    width: 90vw;
  }

  @media only screen and (max-width: 400px) {
    width: 95vw;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #f2f2f2;

  ${surroundPadding}
`;

export const Title = styled.p`
  font-size: ${({ theme }) => theme.sizes._24};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  letter-spacing: -1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const WrapperContent = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  ${SCROLLBAR_STYLE}
  ${surroundPadding}
`;

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: center;

  border: 0;
  background: transparent;

  cursor: pointer;

  & svg path {
    fill: ${({ theme }) => theme.colors.black};
  }

  &:hover svg path {
    opacity: 0.7;
  }
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  height: fit-content;
`;
