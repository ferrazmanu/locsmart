import { Loading } from "@/src/assets";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { ProgressBar } from "@/src/components/progress-bar/progress-bar";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IStepConfig } from "@/src/contexts/modal/modal.interface";
import { useEffect } from "react";
import { STEPS_LIST } from "./modal-telegram-credential.constants";
import { StepCode } from "./step-code/step-code";
import { StepCredential } from "./step-credentials/step-credentials";

export const ModalTelegramCredentials: React.FC = () => {
  const { currentModal, closeModal, currentStep, updateTopModal } =
    useModalContext();

  const stepsConfig: IStepConfig = {
    firstStep: 1,
    lastStep: 2,
  };

  useEffect(() => {
    updateTopModal("steps", STEPS_LIST);
    updateTopModal("title", "Credenciais Telegram");
  }, []);

  return (
    <Modal
      size="lg"
      title={currentModal?.title || ""}
      handleCloseOnClick={closeModal}
    >
      <S.Content>
        <ProgressBar
          currentStep={currentStep?.id || 1}
          totalSteps={stepsConfig.lastStep}
        />

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
