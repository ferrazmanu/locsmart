"use client";

import { ILoggedUser } from "@/src/interfaces/user";
import { getLocalStorage } from "@/src/utils/storage";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { IDashboard, IDashboardState } from "./dashboard.interface";

export const DashboardContext = createContext<IDashboard | undefined>(
  undefined
);

export const DashboardContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [dashboardState, setDashboardState] = useState<IDashboardState>({
    drawerMenu: false,
    showInterface: true,
    loggedUser: null,
  });

  const updateDashboard = <K extends keyof IDashboardState>(
    key: K,
    value: IDashboardState[K]
  ) => {
    setDashboardState((prevState) => ({ ...prevState, [key]: value }));
  };

  const getAuthentication = async () => {
    if (dashboardState.loggedUser) return;

    const userCookies = Cookies.get("LocSmart.User") || null;
    const userStorage: ILoggedUser | null = getLocalStorage("user");

    const userData =
      userStorage ?? (userCookies ? JSON.parse(userCookies) : null);

    if (userData) {
      updateDashboard("loggedUser", userData);
    }
  };

  useEffect(() => {
    getAuthentication();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ dashboardState, setDashboardState, updateDashboard }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error(
      "useDashboardContext must be used within a DashboardContext"
    );
  }
  return context;
};
