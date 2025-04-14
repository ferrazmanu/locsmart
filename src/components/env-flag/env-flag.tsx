"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { Flag } from "./env-flag.styles";

export const EnvFlag: React.FC = () => {
  const {
    dashboardState: { environment },
  } = useDashboardContext();

  if (environment === "prod") return;
  return <Flag>{environment}</Flag>;
};
