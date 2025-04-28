import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { IFilterStyles } from "./filters-wrapper.interfaces";

export const Wrapper = styled.div`
  position: relative;
`;

export const Filters = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<IFilterStyles>`
  position: absolute;
  right: 0;
  top: 105%;

  transition: 0.3s ease-in-out;

  min-width: max-content;
  width: 100%;
  height: fit-content;
  min-height: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);

  border: 2px solid ${({ theme }) => theme.colors.primary};

  h6 {
    font-size: ${({ theme }) => theme.sizes._16};
    color: ${({ theme }) => theme.colors.primary};
  }
  z-index: 2;

  ${(props) =>
    props.isOpen
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `};
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const FilterBody = styled.div`
  overflow: visible;

  ${SCROLLBAR_STYLE}
`;

export const FiltersForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  padding-right: 4px;
`;

export const FiltersField = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
`;
