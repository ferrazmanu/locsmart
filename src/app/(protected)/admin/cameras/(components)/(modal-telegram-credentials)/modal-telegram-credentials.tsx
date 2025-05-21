import { Loading } from "@/src/assets";
import { Modal } from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useEffect, useMemo } from "react";
import { STEPS_LIST } from "./modal-telegram-credential.constants";
import { StepCode } from "./step-code/step-code";
import { StepCredential } from "./step-credentials/step-credentials";

export const ModalTelegramCredentials: React.FC = () => {
  const { modals, closeModal, updateTopModal } = useModalContext();

  const modalData = modals.find(
    (modal) => modal.type === "telegram-credential"
  );

  useEffect(() => {
    updateTopModal("steps", STEPS_LIST);
    updateTopModal("title", "Credenciais Telegram - Dados");
  }, []);

  const currentStep = useMemo(() => {
    return modalData?.steps?.find((s) => s.current);
  }, [modalData]);

  return (
    <Modal
      size="lg"
      title={modalData?.title || ""}
      handleCloseOnClick={closeModal}
      isOpen={modalData?.type === "telegram-credential"}
    >
      <S.Content>
        {!currentStep ? (
          <Loading size="24" />
        ) : (
          <>
            {currentStep?.id === 1 && <StepCredential />}
            {currentStep?.id === 2 && <StepCode />}
          </>
        )}
      </S.Content>
    </Modal>
  );
};
