"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  IModalContext,
  IModalDelete,
  IModalEdit,
  IModalState,
} from "./modal.interface";

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialValue = {
    modalEdit: { isOpen: false, data: null, title: "", id: null, steps: [] },
    modalDelete: { isOpen: false, data: null },
  };

  const [modalState, setModalState] = useState<IModalState>(initialValue);

  const updateModalState = <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => {
    setModalState((prevState) => ({ ...prevState, [key]: value }));
  };

  const updateModalEdit = <K extends keyof IModalEdit>(
    key: K,
    value: IModalEdit[K]
  ) => {
    setModalState((prevState) => ({
      ...prevState,
      modalEdit: {
        ...prevState.modalEdit,
        [key]: value,
      },
    }));
  };

  const updateModalDelete = <K extends keyof IModalDelete>(
    key: K,
    value: IModalDelete[K]
  ) => {
    setModalState((prevState) => ({
      ...prevState,
      modalDelete: {
        ...prevState.modalDelete,
        [key]: value,
      },
    }));
  };

  const setActiveStep = (index: number) => {
    setModalState((prevState) => {
      const updatedSteps = prevState.modalEdit.steps.map((step, i) => ({
        ...step,
        current: step.id === index,
      }));

      return {
        ...prevState,
        modalEdit: {
          ...prevState.modalEdit,
          steps: updatedSteps,
        },
      };
    });
  };

  const currentStep = useMemo(
    () => modalState.modalEdit.steps.find((item) => item.current),
    [modalState.modalEdit.steps]
  );

  useEffect(() => {
    if (!modalState.modalEdit.isOpen) {
      setModalState({
        ...modalState,
        modalEdit: initialValue.modalEdit,
      });
    }
  }, [modalState.modalEdit.isOpen]);

  useEffect(() => {
    if (!modalState.modalDelete.isOpen) {
      setModalState({
        ...modalState,
        modalDelete: initialValue.modalDelete,
      });
    }
  }, [modalState.modalDelete.isOpen]);

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setActiveStep,
        updateModalEdit,
        updateModalDelete,
        updateModalState,
        currentStep,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalContext");
  }
  return context;
};
