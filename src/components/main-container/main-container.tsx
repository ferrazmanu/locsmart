"use client";

import * as S from "./main-container.styles";

export const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <S.MainContainer>{children}</S.MainContainer>;
};
