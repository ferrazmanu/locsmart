"use client";

import { usePathname } from "next/navigation";
import { useDashboardContext } from "../contexts/dashboard/dashboard.context";
import { publicRoutes } from "../routes/public-routes";
import { ROUTES_LIST } from "../routes/routes";

export const usePermission = () => {
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();
  const pathname = usePathname();

  function checkPermission(pathname: string, userRole: string): boolean {
    if (publicRoutes.includes(pathname)) {
      return true;
    }

    const check = (routes: any[]): boolean => {
      for (const route of routes) {
        if (route.url === pathname) {
          return route.permissions.includes(userRole);
        }
        if (route.children && route.children.length > 0) {
          const childCheck = check(route.children);
          if (childCheck) return true;
        }
      }
      return false;
    };

    return check(ROUTES_LIST);
  }
  const hasPermission = checkPermission(pathname, loggedUser?.perfil || "");

  return { hasPermission };
};
