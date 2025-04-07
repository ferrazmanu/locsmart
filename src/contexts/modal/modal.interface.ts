import { FieldValues } from "react-hook-form";
import { z } from "zod";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
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
  isOpen: "edit" | "delete" | null;
  id?: string | null;
  data?: TGenericObject;
  title: string;
  steps: IStep[];
}

interface IModalContext {
  modalState: IModalState;
  updateModalState: <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => void;
  setActiveStep: (index: number) => void;
  currentStep: IStep<FieldValues> | undefined;
}

export type { IModalContext, IModalState, IStep, IStepConfig, TGenericObject };
