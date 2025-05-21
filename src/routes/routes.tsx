import { IListItem } from "@/src/components/drawer-menu/drawer-menu.interfaces";
import { AiOutlineCar } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
// import { AiFillCar } from "react-icons/ai";

const MENU_ROUTES: IListItem[] = [
  // {
  //   id: "dashboard",
  //   url: "/dashboard",
  //   name: "Dashboard",
  //   icon: <RxDashboard />,
  //   children: [],
  // },
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
  {
    id: "lpr",
    url: "/plate-reading",
    name: "Leitura de Placas",
    icon: <AiOutlineCar />,
    children: [],
  },
];

export { MENU_ROUTES };
