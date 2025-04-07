import { ToastType } from "@/src/contexts/dashboard/dashboard.interface";
import isPropValid from "@emotion/is-prop-valid";
import styled, { css, keyframes } from "styled-components";

const progressAnimation = keyframes`
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
`;

const typeStyles = {
  success: css`
    color: #328d29;
  `,
  error: css`
    color: #c13a3b;
  `,
  info: css`
    color: #dcc34b;
  `,
};

export const StyledToast = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ type: ToastType }>`
  color: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  margin-top: 0.5rem;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  gap: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  position: relative;

  svg {
    width: 20px;
    height: 20px;
    ${({ type }) => typeStyles[type]}
  }

  .progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.grays._800};
    animation: ${progressAnimation} 3s linear forwards;
  }
`;
