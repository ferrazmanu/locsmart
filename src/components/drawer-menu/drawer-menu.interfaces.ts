import { TProfileName } from "@/src/constants/profile-type";
import { ReactNode } from "react";

interface IListItem {
  id: string;
  order?: number;
  icon?: ReactNode;
  name: string;
  url: string;
  permissions?: TProfileName[];
  children: IListItem[];
}

interface ISubMenu {
  item: IListItem;
  idSubMenuOpen: string | null;
  setIdSubMenuOpen: (id: string | null) => void;
}

interface IItem {
  item: IListItem;
  idOpen: string | null;
  setIdOpen: (id: string | null) => void;
}

type IOpenID = string | null;

export type { IItem, IListItem, IOpenID, ISubMenu };
