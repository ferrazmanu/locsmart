import React from "react";

import { IProgressBar } from "./progress-bar.interfaces";
import * as S from "./progress-bar.styles";

export const ProgressBar: React.FC<IProgressBar> = ({
  currentStep,
  totalSteps = 1,
}) => {
  return (
    <S.Container>
      <S.Title>
        Passo <span>{currentStep}</span> de <span>{totalSteps}</span>
      </S.Title>

      <S.Progress value={currentStep} max={totalSteps} />
    </S.Container>
  );
};
