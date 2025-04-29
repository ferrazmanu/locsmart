"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { IModalContext, IModalState } from "./modal.interface";

export const ModalContext = createContext<IModalContext | undefined>(undefined);

export const ModalContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [modals, setModals] = useState<IModalState[]>([]);

  const openModal = (modalData: IModalState) => {
    setModals((prev) => {
      const id = prev.length;
      const modalWithId = { ...modalData, id };
      return [...prev, modalWithId];
    });
  };

  const closeModal = () => {
    setModals((prev) => prev.slice(0, -1));
  };

  const updateTopModal = <K extends keyof IModalState>(
    key: K,
    value: IModalState[K]
  ) => {
    setModals((prev) => {
      if (prev.length === 0) return prev;
      const updatedModals = [...prev];
      const topModal = {
        ...updatedModals[updatedModals.length - 1],
        [key]: value,
      };
      updatedModals[updatedModals.length - 1] = topModal;
      return updatedModals;
    });
  };

  const setTopActiveStep = (index: number) => {
    setModals((prevModals) => {
      if (prevModals.length === 0) return prevModals;

      const updatedModals = [...prevModals];
      const topModal = { ...updatedModals[updatedModals.length - 1] };

      topModal.steps = topModal?.steps?.map((step) => ({
        ...step,
        current: step.id === index,
      }));

      updatedModals[updatedModals.length - 1] = topModal;

      return updatedModals;
    });
  };

  const currentModal = useMemo(() => {
    return modals[modals.length - 1];
  }, [modals]);

  const currentStep = useMemo(() => {
    return currentModal?.steps?.find((s) => s.current);
  }, [currentModal]);

  return (
    <ModalContext.Provider
      value={{
        modals,
        openModal,
        closeModal,
        updateTopModal,
        currentModal,
        setTopActiveStep,
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
