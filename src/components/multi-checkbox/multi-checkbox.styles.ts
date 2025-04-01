import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const SamplesBox = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ error?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 16px;
  border: solid 1px
    ${(props) =>
      props.error ? props.theme.colors.danger : props.theme.colors.grays._100};

  hr {
    height: 1px;
    width: 100%;
    opacity: 0.3;
  }

  max-height: 250px;
  overflow-y: auto;

  ${SCROLLBAR_STYLE}
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;

  &:not(:last-child)::after {
    content: "";
    position: relative;
    height: 0.5px;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    margin-top: 8px;
  }
`;

export const ItemTitle = styled.h6`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.sizes._16};
`;
