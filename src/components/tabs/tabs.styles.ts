import isPropValid from "@emotion/is-prop-valid";
import { css, styled } from "styled-components";

export const TabsContainer = styled.div`
  display: flex;
  gap: 8px;
  padding-bottom: 12px;
  justify-content: center;
  width: 100%;

  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

export const TabButton = styled.button.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ isActive: boolean }>`
  width: 100%;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s, color 0.3s;
  border: none;

  ${(props) =>
    props.isActive
      ? css`
          background-color: ${props.theme.colors.primary};
          color: ${props.theme.colors.white};
          font-weight: bold;
        `
      : css`
          background-color: ${props.theme.colors.grays._50};
          font-weight: normal;

          border: 1px solid #000;

          &:hover {
            background: ${props.theme.colors.grays._70};
          }
        `};
`;
