import { ReactElement } from "react";
import { TSide } from "../tooltip/tooltip.interfaces";

interface IOptionsList {
  options: IOption[];
  boxSide?: TSide;
}

interface IOption {
  icon: ReactElement;
  label: string;
  onClick: () => void;
}

interface IOptionsListMenu {
  options: IOption[];
  openOptionsList: boolean;
  setOpenOptionsList: (value: boolean) => void;
}

export type { IOption, IOptionsList, IOptionsListMenu };
