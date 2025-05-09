"use client";

import { createSession, deleteSession } from "@/src/app/lib/session";
import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { ILoggedUser } from "@/src/interfaces/logged-user.interface";
import { authenticate } from "@/src/services/api/endpoints/auth";
import { setLocalStorage } from "@/src/utils/storage";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { ILoginForm } from "../app/login/login-form/login.schema";
import { useRedirect } from "./useRedirect";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { updateDashboard, showToast } = useDashboardContext();
  const { redirectTo } = useRedirect();

  const submitLogin = async (dataForm: ILoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authenticate(dataForm);

      if (res.status !== 200) return null;

      const login = res.data.login;

      const loggedUser: ILoggedUser = {
        email: login.email,
        name: login.nome,
        primeiroAcesso: login.primeiroAcesso,
      };

      await createSession(login.token, login.expiracao, loggedUser);

      setLocalStorage("token", login.token);
      setLocalStorage("user", loggedUser);

      updateDashboard("loggedUser", loggedUser);

      if (!loggedUser.primeiroAcesso)
        redirectTo(`${process.env.NEXT_PUBLIC_HOME_REDIRECT}`);
    } catch (e) {
      const error = e as Error | AxiosError;

      let errorMessage = "Algo deu errado.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Verifique suas credenciais.";

        return showToast(errorMessage, "error");
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await deleteSession();
    updateDashboard("loggedUser", null);
    redirectTo("/login");
  };

  return {
    error,
    loading,
    submitLogin,
    logout,
  };
};
