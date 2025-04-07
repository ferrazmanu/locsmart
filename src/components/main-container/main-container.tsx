"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import * as S from "./main-container.styles";

export const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {
    dashboardState: { showInterface, drawerMenu },
  } = useDashboardContext();

  return (
    <S.Wrapper showInterface={showInterface} menuOpen={drawerMenu}>
      {children}
    </S.Wrapper>
  );
};
