import { IListItem } from "@/src/components/drawer-menu/drawer-menu.interfaces";
import { AiOutlineCar } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

const ROUTES_LIST: IListItem[] = [
  {
    id: "admin",
    url: "/admin",
    name: "Administrativo",
    icon: <FiSettings />,
    permissions: ["Administrador"],
    children: [
      {
        id: "companies",
        url: "/admin/companies",
        name: "Empresas",
        permissions: ["Administrador"],
        children: [],
      },
      {
        id: "cameras",
        url: "/admin/cameras",
        name: "Câmeras",
        permissions: ["Administrador"],
        children: [],
      },
      {
        id: "groups",
        url: "/admin/groups",
        name: "Grupos",
        permissions: ["Administrador"],
        children: [],
      },
      {
        id: "users",
        url: "/admin/users",
        name: "Usuários",
        permissions: ["Administrador"],
        children: [],
      },
    ],
  },
  {
    id: "lpr",
    url: "/plate-reading",
    name: "Leitura de Placas",
    icon: <AiOutlineCar />,
    permissions: ["Administrador", "Comum", "Morador", "Porteiro"],
    children: [],
  },
];

export { ROUTES_LIST };
