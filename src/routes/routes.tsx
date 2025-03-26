import { IListItem } from "@/src/components/drawer-menu/drawer-menu.interfaces";
import { FiSettings } from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";

const MENU_ROUTES: IListItem[] = [
  {
    id: "dashboard",
    url: "/dashboard",
    name: "Dashboard",
    icon: <RxDashboard />,
    children: [],
  },
  {
    id: "admin",
    url: "/dashboard/admin",
    name: "Administrativo",
    icon: <FiSettings />,
    children: [
      {
        id: "companies",
        url: "/dashboard/admin/companies",
        name: "Empresas",
        children: [],
      },
      {
        id: "cameras",
        url: "/dashboard/admin/cameras",
        name: "Câmeras",
        children: [],
      },
      {
        id: "groups",
        url: "/dashboard/admin/groups",
        name: "Grupos",
        children: [],
      },
      {
        id: "users",
        url: "/dashboard/admin/users",
        name: "Usuários",
        children: [],
      },
    ],
  },
];

export { MENU_ROUTES };
