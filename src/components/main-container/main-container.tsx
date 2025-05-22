"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { usePermission } from "@/src/hooks/usePermission";
import * as S from "./main-container.styles";

export const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { hasPermission } = usePermission();

  const {
    dashboardState: { showInterface, drawerMenu, environment },
  } = useDashboardContext();

  if (!hasPermission) return;
  return (
    <S.Wrapper
      showInterface={showInterface}
      menuOpen={drawerMenu}
      envFlag={!!(environment !== "prod" && environment !== null)}
    >
      {children}
    </S.Wrapper>
  );
};
