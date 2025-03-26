"use client";

import { OptionsList } from "@/src/components/options-list/options-list";
import { IOption } from "@/src/components/options-list/options-list.interfaces";
import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { useLogin } from "@/src/hooks/useLogin";
import Image from "next/image";
import { RxHamburgerMenu } from "react-icons/rx";
import * as S from "./header.styles";

import { MdLogout } from "react-icons/md";

import UserImage from "../../../public/user.png";

export const Header: React.FC = () => {
  const {
    dashboardState,
    dashboardState: { showInterface, loggedUser },
    updateDashboard,
  } = useDashboardContext();

  const { logout } = useLogin();

  const MORE_INFO_OPTIONS: IOption[] = [
    {
      icon: <MdLogout />,
      label: "Sair",
      onClick: logout,
    },
  ];

  if (!showInterface) return;
  return (
    <>
      <S.Wrapper>
        <S.DrawerMenuCaller
          onClick={() =>
            updateDashboard("drawerMenu", !dashboardState.drawerMenu)
          }
        >
          <RxHamburgerMenu size={24} />
        </S.DrawerMenuCaller>

        <S.MenuWrapper>
          <S.ProfileImage>
            <Image alt="profile image" src={UserImage} height={30} width={30} />
          </S.ProfileImage>
          <p>{loggedUser?.name}</p>
          <OptionsList options={MORE_INFO_OPTIONS} boxSide="right" />
        </S.MenuWrapper>
      </S.Wrapper>
    </>
  );
};
