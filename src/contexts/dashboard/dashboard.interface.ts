import { ILoggedUser } from "@/src/interfaces/logged-user";

interface IDashboardState {
  drawerMenu: boolean;
  showInterface: boolean;
  loggedUser?: ILoggedUser | null;
}

interface IDashboard {
  dashboardState: IDashboardState;
  setDashboardState: React.Dispatch<React.SetStateAction<IDashboardState>>;
  updateDashboard: <K extends keyof IDashboardState>(
    key: K,
    value: IDashboardState[K]
  ) => void;
}

export type { IDashboard, IDashboardState };
