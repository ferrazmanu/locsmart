"use client";

import { deleteSession } from "@/src/app/lib/session";
import Toast from "@/src/components/toast/toast";
import { ILoggedUser } from "@/src/interfaces/logged-user.interface";
import { getLocalStorage } from "@/src/utils/storage";
import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IDashboard,
  IDashboardState,
  ToastMessage,
  ToastType,
} from "./dashboard.interface";

let toastId = 0;

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
    toasts: [],
    environment: null,
  });

  const updateDashboard = <K extends keyof IDashboardState>(
    key: K,
    value: IDashboardState[K]
  ) => {
    setDashboardState((prevState) => ({ ...prevState, [key]: value }));
  };

  const getAuthentication = async () => {
    const userCookies = Cookies.get("LocSmart.User") || null;
    const userStorage: ILoggedUser | null = getLocalStorage("user");
    const userData =
      userStorage ?? (userCookies ? JSON.parse(userCookies) : null);

    if (userData && userCookies) {
      updateDashboard("loggedUser", userData);
    } else {
      await deleteSession();
      updateDashboard("loggedUser", null);
    }
  };

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = toastId++;
    const newToast: ToastMessage = { id, message, type };

    setDashboardState((prevState) => ({
      ...prevState,
      toasts: [...prevState.toasts, newToast],
    }));

    setTimeout(() => {
      setDashboardState((prevState) => ({
        ...prevState,
        toasts: prevState.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  }, []);

  const getSetEnvironment = () => {
    const envFile = `${process.env.NODE_ENV}`;

    const ENV_KEYS: { [key: string]: string } = {
      development: "dev",
      production: "prod",
    };

    const environment = ENV_KEYS[envFile];

    setDashboardState((prevState) => ({
      ...prevState,
      environment: environment as IDashboardState["environment"],
    }));
  };

  useEffect(() => {
    getAuthentication();
    getSetEnvironment();
  }, []);

  return (
    <DashboardContext.Provider
      value={{ dashboardState, setDashboardState, updateDashboard, showToast }}
    >
      {children}

      <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
        {dashboardState.toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} type={toast.type} />
        ))}
      </div>
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
