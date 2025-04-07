"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { IModalContext, IModalState } from "./modal.interface";

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const initialValue = {
    isOpen: null,
    data: null,
    title: "",
    id: null,
    steps: [],
  };

  const [modalState, setModalState] = useState<IModalState>(initialValue);

  const updateModalState = <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => {
    setModalState((prevState) => ({ ...prevState, [key]: value }));
  };

  const setActiveStep = (index: number) => {
    setModalState((prevState) => {
      const updatedSteps = prevState.steps.map((step, i) => ({
        ...step,
        current: step.id === index,
      }));

      return {
        ...prevState,
        steps: updatedSteps,
      };
    });
  };

  const currentStep = useMemo(
    () => modalState.steps.find((item) => item.current),
    [modalState.steps]
  );

  useEffect(() => {
    if (modalState.isOpen === null) {
      setModalState(initialValue);
    }
  }, [modalState.isOpen]);

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setActiveStep,
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
