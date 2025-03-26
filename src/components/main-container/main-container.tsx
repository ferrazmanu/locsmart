"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import * as S from "./main-container.styles";

export const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {
    dashboardState: { showInterface },
  } = useDashboardContext();

  return (
    <S.MainContainer showInterface={showInterface}>{children}</S.MainContainer>
  );
};
