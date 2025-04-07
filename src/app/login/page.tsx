"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { LoginForm } from "./login-form/login-form";
import * as S from "./login.styles";
import { NewPasswordForm } from "./new-password-form/new-password-form";

export default function Login() {
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  return (
    <S.Wrapper>
      {!loggedUser && <LoginForm />}

      {loggedUser && loggedUser?.primeiroAcesso && <NewPasswordForm />}
    </S.Wrapper>
  );
}
