import { TGenericObject } from "@/src/contexts/modal/modal.interface";
import { ReactElement } from "react";
import { TSide } from "../tooltip/tooltip.interfaces";

interface IMoreInfo {
  options: IOption[];
  boxSide?: TSide;
  item: TGenericObject;
}

interface IOption {
  icon: ReactElement;
  label: string;
  onClick: (item: TGenericObject) => void;
}

interface IMoreInfoMenu {
  options: IOption[];
  handleClose: () => void;
  item: TGenericObject;
}

export type { IMoreInfo, IMoreInfoMenu, IOption };
