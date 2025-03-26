import Link from "next/link";
import styled, { css } from "styled-components";

export const DRAWER_MENU_WIDTH = 280;

const ITEM_STYLES = css`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grays._100};
  font-size: ${({ theme }) => theme.sizes._16};
`;

export const StyledLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  text-decoration: none;

  ${ITEM_STYLES}

  ${(props) =>
    props.selected &&
    css`
      color: ${({ theme }) => theme.colors.primary} !important;
    `}
`;

export const Title = styled.div<{ selected: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${ITEM_STYLES}

  ${(props) =>
    props.selected &&
    css`
      color: ${({ theme }) => theme.colors.primary} !important;
    `}
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Wrapper = styled.nav<{ open?: boolean }>`
  width: ${DRAWER_MENU_WIDTH}px;
  height: calc(100% - 60px);
  background: ${({ theme }) => theme.colors.white};
  position: fixed;
  top: 60px;
  transition: left 0s ease-in-out;
  z-index: 5;

  box-shadow: 1px 1px 10px 0px rgba(0, 0, 0, 0.1);

  ${(props) =>
    props.open
      ? css`
          left: 0;
        `
      : css`
          left: -100%;
        `}
`;

export const MenuLine = styled.li`
  width: 100%;
  height: 40px;
  padding: 0 14px 0 18px;
  line-height: 40px;
  cursor: pointer;
`;

export const Menu = styled.ul`
  height: 100%;
  padding: 10px 0;

  display: flex;
  flex-direction: column;
  gap: 6px;

  overflow-y: hidden;

  &:hover {
    overflow-y: auto;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grays._400};
  }
`;

export const SubMenuLink = styled(Link)<{ selected: boolean }>`
  width: 100%;
  text-decoration: none;
  display: flex;
  justify-content: space-between;

  ${ITEM_STYLES}

  ${(props) =>
    props.selected &&
    css`
      color: ${({ theme }) => theme.colors.primary} !important;
    `}
`;

export const SubMenuTitle = styled.div<{ selected: boolean }>`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 80%;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  ${ITEM_STYLES}

  ${(props) =>
    props.selected &&
    css`
      color: ${({ theme }) => theme.colors.primary} !important;
    `}
`;

export const SubMenu = styled.ul`
  padding: 0px 20px 0 60px;
  margin-top: -6px;

  display: flex;
  flex-direction: column;

  & li {
    display: flex;
    align-items: center;
    height: 42px;
  }
`;

export const SubSubMenu = styled.ul`
  padding: 18px 20px 20px 40px;
  display: flex;
  flex-direction: column;

  & li {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 3px 0 10px;
  }
`;

export const IconItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;

  svg {
    width: 20px;
    height: 20px;
  }
`;
