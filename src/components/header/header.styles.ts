import styled from "styled-components";

export const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  padding: 0 20px;

  background: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid rgba(230, 230, 230, 0.7);

  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  z-index: 9;
`;

export const Logo = styled.img`
  width: auto;
  height: 35px;
`;

export const Button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  gap: 15px;

  align-items: center;

  color: ${({ theme }) => theme.colors.grays._400};
  line-height: ${({ theme }) => theme.sizes._12};
  font-size: ${({ theme }) => theme.sizes._14};
  opacity: 0.7;

  transition: color 0.1s linear 0s, background-color 0.1s linear 0s,
    opacity 0.2s linear 0s !important;

  & svg {
    fill: ${({ theme }) => theme.colors.grays._400};
    opacity: 0.7;

    height: 16px;
    width: auto;
  }

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  @media only screen and (max-width: 992px) {
    gap: 4px;

    & svg {
      fill: ${({ theme }) => theme.colors.primary};
      opacity: 1;
    }

    .text {
      display: none;
    }
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  & p {
    color: ${({ theme }) => theme.colors.grays._400};
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 400;
  }
`;

export const DrawerMenuCaller = styled.div`
  cursor: pointer;
  display: flex;

  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;

export const ProfileImage = styled.div`
  border-radius: 50;
  overflow: hidden;
  aspect-ratio: 1;

  img {
    object-fit: cover;
  }
`;
