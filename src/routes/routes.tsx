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
    url: "/admin",
    name: "Administrativo",
    icon: <FiSettings />,
    children: [
      {
        id: "companies",
        url: "/admin/companies",
        name: "Empresas",
        children: [],
      },
      {
        id: "cameras",
        url: "/admin/cameras",
        name: "Câmeras",
        children: [],
      },
      {
        id: "groups",
        url: "/admin/groups",
        name: "Grupos",
        children: [],
      },
      {
        id: "users",
        url: "/admin/users",
        name: "Usuários",
        children: [],
      },
    ],
  },
];

export { MENU_ROUTES };
