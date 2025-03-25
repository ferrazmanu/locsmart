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

interface IModalEdit {
  isOpen: boolean;
  id?: string | null;
  data?: TGenericObject;
  title: string;
  steps: IStep[];
}

interface IModalDelete {
  isOpen: boolean;
  data?: TGenericObject;
}

interface IModalState {
  modalEdit: IModalEdit;
  modalDelete: IModalDelete;
}

interface IModalContext {
  modalState: IModalState;
  updateModalState: <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => void;
  updateModalEdit: <K extends keyof IModalEdit>(
    key: K,
    value: IModalEdit[K]
  ) => void;
  updateModalDelete: <K extends keyof IModalDelete>(
    key: K,
    value: IModalDelete[K]
  ) => void;
  setActiveStep: (index: number) => void;
  currentStep: IStep<FieldValues> | undefined;
}

export type {
  IModalContext,
  IModalDelete,
  IModalEdit,
  IModalState,
  IStep,
  IStepConfig,
  TGenericObject,
};
