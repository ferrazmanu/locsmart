import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { IModalDeleteStyles } from "./modal-delete.interface";

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IModalDeleteStyles>`
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: fixed;
  z-index: 999;

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

export const Overlay = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IModalDeleteStyles>`
  ${(props) =>
    props.open
      ? css`
          opacity: 1;
          height: inherit;
          width: inherit;
          background-color: rgba(255, 255, 255, 0.7);
          position: fixed;
        `
      : css`
          opacity: 0;
        `}
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

  border-radius: 4px;
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
