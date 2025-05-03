import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";

const surroundPadding = css`
  padding: 0 0 1rem 0;

  @media only screen and (max-width: 500px) {
    padding: 0 0 10px 0;
  }
`;

export const BackgroundOverlay = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ isOpen: boolean }>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;
  background: rgba(0, 0, 0, 0.5);

  ${(props) =>
    props.isOpen
      ? css`
          opacity: 1;
          visibility: visible;

          .modal-wrapper {
            transform: scale(1);
          }
        `
      : css`
          opacity: 0;
          visibility: hidden;

          .modal-wrapper {
            transform: scale(0);
          }
        `}

  transform-origin: center;
  transition: all 0.3s ease-in-out;
`;

export const Wrapper = styled.div`
  position: relative;
  height: max-content;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 16px;

  min-width: 20%;
  max-width: 400px;

  width: 100%;
  padding: 16px 12px;

  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.1);

  z-index: 20;
  transition: all 0.3s ease-in-out;
`;

export const DeleteMessage = styled.div`
  padding: 8px;
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  padding-right: 4px;
  overflow-y: auto;

  ${SCROLLBAR_STYLE}
`;

export const ButtonActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
  flex-wrap: wrap;
  gap: 10px;
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
