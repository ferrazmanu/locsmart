import { ILoggedUser } from "@/src/interfaces/logged-user";

interface IDashboardState {
  drawerMenu: boolean;
  showInterface: boolean;
  loggedUser?: ILoggedUser | null;
  toasts: ToastMessage[];
}

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface IDashboard {
  dashboardState: IDashboardState;
  setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>;
  updateDashboard: <K extends keyof IDashboardState>(
    key: K,
    value: IDashboardState[K]
  ) => void;
  showToast: (message: string, type?: ToastType) => void;
}

export type { IDashboard, IDashboardState };
