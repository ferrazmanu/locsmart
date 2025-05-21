import isPropValid from "@emotion/is-prop-valid";
import Image from "next/image";
import styled from "styled-components";

export const StyledImage = styled(Image).withConfig({
  shouldForwardProp: (prop) => isPropValid(prop),
})<{ openOnClick?: boolean }>`
  object-fit: contain;
  height: fit-content;

  ${({ openOnClick }) =>
    openOnClick ? `cursor: pointer;` : `cursor: default;`}
`;
