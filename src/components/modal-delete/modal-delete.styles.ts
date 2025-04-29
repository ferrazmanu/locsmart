import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { IModalDeleteStyles } from "./modal-delete.interface";

const surroundPadding = css`
  padding: 0 0 1rem 0;

  @media only screen and (max-width: 500px) {
    padding: 0 0 10px 0;
  }
`;

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IModalDeleteStyles>`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  padding: 10px;

  ${(props) =>
    props.open
      ? css`
          opacity: 1;
          height: 100vh;
          width: 100vw;
          z-index: 10;
          bottom: 0;
          right: 0;
          display: flex;
        `
      : css`
          opacity: 0;
          visibility: hidden;
          inset: 0;
          display: none;
        `};
`;

export const BackgroundOverlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalDeleteWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IModalDeleteStyles>`
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
  transition: 0.3s ease-in-out;

  z-index: 20;
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
