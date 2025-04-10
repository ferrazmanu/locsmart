import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import { styled } from "styled-components";
import { ITextareaStyles } from "./textarea.interfaces";

export const TextareaStyles = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<ITextareaStyles>`
  border: solid 1px
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.grays._100};
  color: ${({ theme }) => theme.colors.grays._900};
  width: 100%;
  overflow: hidden;
  height: 100px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grays._100};
  }

  textarea {
    width: 100%;
    padding: 6px 16px;
    border: none;
    background-color: transparent;
    height: 100% !important;
    resize: none;
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 400;

    &:disabled {
      cursor: not-allowed;
      background-color: ${({ theme }) => theme.colors.grays._70};
    }

    ${SCROLLBAR_STYLE}
  }
`;
