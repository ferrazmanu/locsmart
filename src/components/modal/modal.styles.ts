import { SCROLLBAR_STYLE } from "@/src/styles/global";
import isPropValid from "@emotion/is-prop-valid";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";

const sizes = {
  lg: "85vw",
  md: "50vw",
  sm: "30vw",
};

const surroundPadding = css`
  padding: 1rem 2rem;

  @media only screen and (max-width: 500px) {
    padding: 10px;
  }
`;

export const BlurredBackground = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 10;

  background: rgba(255, 255, 255, 0.7);
`;

export const Wrapper = styled(motion.div)<{ $size: "sm" | "md" | "lg" }>`
  width: ${(props) => sizes[props.$size]};
  height: auto;
  max-height: 90vh;

  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;

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

export const WrapperContent = styled.div`
  flex: 1;

  ${surroundPadding}
`;

export const Field = styled.fieldset`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const InlineFieldsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 12px;

  @media only screen and (max-width: 400px) {
    flex-direction: column;
  }
`;

export const GridFieldsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  gap: 12px;

  @media only screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FormContainer = styled.form`
  width: 100%;
  max-height: 70vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 2px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 8px;
  gap: 8px;

  ${SCROLLBAR_STYLE}
`;

export const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 14px;
    color: #626262;
  }
`;

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ hasDivider?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .has-divider {
    &:not(:last-child) {
      ${(props) =>
        props.hasDivider &&
        css`
          border-bottom: 1px solid rgba(19, 34, 46, 0.3);
          padding-bottom: 12px;
        `}
    }
  }

  hr {
    display: block;
    height: 1px;
    border: 0;
    border-top: 1px solid rgba(19, 34, 46, 0.3);
    margin: 1px 0;
    padding: 0;
  }
`;

export const ButtonActions = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  margin-top: 8px;
  justify-content: flex-end;

  button {
    border-radius: 4px;
  }
`;
