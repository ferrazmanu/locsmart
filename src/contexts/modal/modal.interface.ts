import { FieldValues } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TGenericObject = Record<string, any> | null;

interface IStep<T extends FieldValues = FieldValues> {
  id: number;
  title?: string;
  schema?: z.ZodType<T>;
  current: boolean;
}

interface IStepConfig {
  firstStep: number;
  lastStep: number;
}

interface IModalState {
  type:
    | "edit"
    | "delete"
    | "register-payment"
    | "telegram-credential"
    | "image"
    | null;
  id?: number;
  data?: TGenericObject;
  title?: string;
  steps?: IStep[];
}

interface IModalContext {
  modals: IModalState[];
  openModal: (modal: IModalState) => void;
  closeModal: () => void;
  updateTopModal: <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => void;
  setTopActiveStep: (index: number) => void;
  openModalTypes: Set<IModalState["type"]>;
}

export type { IModalContext, IModalState, IStep, IStepConfig, TGenericObject };
