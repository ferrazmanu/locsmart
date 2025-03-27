import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css } from "styled-components";
import { ITableDataStyles } from "./table.interfaces";

const GENERAL_STYLES = css`
  width: 100%;
  display: flex;
  min-width: fit-content;
`;

export const TableContainer = styled.div`
  height: 100%;
  overflow: auto;

  ${SCROLLBAR_STYLE}
`;

export const TableWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RowWrapper = styled.div`
  ${GENERAL_STYLES}
  justify-content: space-between;
  min-height: 32px;
  align-items: center;
  padding: 8px;
  gap: 16px;

  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.colors.white};
  }

  @media only screen and (max-width: 768px) {
    box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.05);
    display: block;

    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const DataWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<ITableDataStyles>`
  width: ${(props) => (props.columnWidth ? props.columnWidth : "10vw")};

  span {
    font-weight: ${({ isTitle }) => (isTitle ? "600" : "400")};
  }

  @media only screen and (max-width: 768px) {
    border-bottom: 1px solid rgba(230, 230, 230, 0.7);
    display: flex;
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 4px;

    .content,
    .tooltiptext {
      white-space: normal !important;
    }

    &::before {
      content: attr(data-label);
      color: ${({ theme }) => theme.colors.grays._800};
      font-size: ${({ theme }) => theme.sizes._14};
      font-weight: 500;
      text-align: left;
    }

    &:not(:last-child) {
      padding-bottom: 4px;
    }
    &:not(:first-child) {
      padding-top: 4px;
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;

export const HeaderWrapper = styled.div`
  ${GENERAL_STYLES}
  justify-content: space-between;
  font-weight: 500;
  padding: 8px;
  gap: 16px;

  position: sticky;
  top: 0;
  left: 0;

  background: ${({ theme }) => theme.colors.grays._50};
  z-index: 1;

  .data {
    color: ${({ theme }) => theme.colors.grays._800};
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 500;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const BodyWrapper = styled.div`
  ${GENERAL_STYLES}
  flex-direction: column;
  gap: 8px;

  .data {
    color: ${({ theme }) => theme.colors.grays._400};
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 400;
  }
`;

export const NoData = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  color: ${({ theme }) => theme.colors.grays._400};
  font-size: ${({ theme }) => theme.sizes._16};
`;
