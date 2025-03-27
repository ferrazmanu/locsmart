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

  gap: 2vw;

  .left-wrapper {
    display: flex;
    align-items: center;
    gap: 2vw;
  }
`;

export const Logo = styled.div`
  max-width: 200px;
  min-width: 100px;
  aspect-ratio: 954/229;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  & p {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.sizes._14};
    font-weight: 400;
  }

  @media only screen and (max-width: 992px) {
    & p {
      font-size: ${({ theme }) => theme.sizes._12};
    }
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
  width: 30px;
  height: 30px;
  border-radius: 50px;
  overflow: hidden;
  aspect-ratio: 1;

  border: 1px solid ${({ theme }) => theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media only screen and (max-width: 992px) {
    width: 25px;
    height: 25px;
  }
`;
