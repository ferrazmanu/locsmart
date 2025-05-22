"use client";

import { useState } from "react";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { ROUTES_LIST } from "@/src/routes/routes";
import { IOpenID } from "./drawer-menu.interfaces";
import * as S from "./drawer-menu.styles";
import { Item } from "./item/item.drawer-menu";

export const DrawerMenu: React.FC = () => {
  const [idOpen, setIdOpen] = useState<IOpenID>(null);

  const {
    dashboardState: { drawerMenu, showInterface, environment, loggedUser },
  } = useDashboardContext();

  const allowedRoutes = ROUTES_LIST.filter((route) => {
    if (loggedUser?.perfil)
      return route.permissions?.includes(loggedUser?.perfil);
  });

  if (!showInterface) return;
  return (
    <S.Wrapper
      open={drawerMenu}
      envFlag={!!(environment !== "prod" && environment !== null)}
    >
      <S.Menu>
        {allowedRoutes.map((item) => {
          return (
            <Item
              key={item.id}
              item={item}
              idOpen={idOpen}
              setIdOpen={setIdOpen}
            ></Item>
          );
        })}
      </S.Menu>
    </S.Wrapper>
  );
};
