"use client";

import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import Cookies from "js-cookie";
import { LoginForm } from "./login-form/login-form";
import * as S from "./login.styles";
import { NewPasswordForm } from "./new-password-form/new-password-form";

export default function Login() {
  const {
    dashboardState: { loggedUser },
  } = useDashboardContext();

  const userCookies = Cookies.get("LocSmart.User") || null;

  return (
    <S.Wrapper>
      {!userCookies && <LoginForm />}

      {userCookies && loggedUser && loggedUser?.primeiroAcesso && (
        <NewPasswordForm />
      )}
    </S.Wrapper>
  );
}
