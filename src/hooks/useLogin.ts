"use client";

import { ILogin } from "@/src/app/login/login.interfaces";
import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
// import { authenticate } from "@/src/services/api/endpoints/auth";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { createSession, deleteSession } from "../app/lib/session";
import { ILoggedUser } from "../interfaces/logged-user";
import { authenticate } from "../services/api/endpoints/auth";
import { removeLocalStorage, setLocalStorage } from "../utils/storage";
import { useRedirect } from "./useRedirect";

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { updateDashboard } = useDashboardContext();
  const { redirectTo } = useRedirect();

  const submitLogin = async (dataForm: ILogin) => {
    setLoading(true);
    setError(null);

    try {
      const res = await authenticate(dataForm);

      if (res.status !== 200) return null;

      const loggedUser: ILoggedUser = {
        email: res.data.login.email,
        name: res.data.login.nome,
      };

      await createSession(
        res.data.login.token,
        res.data.login.expiracao,
        loggedUser
      );

      setLocalStorage("token", res.data.login.token);
      setLocalStorage("user", loggedUser);

      updateDashboard("loggedUser", loggedUser);

      redirectTo("/dashboard");
    } catch (e) {
      const error = e as Error | AxiosError;

      let errorMessage = "Algo deu errado.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || "Verifique suas credenciais.";
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  const logout = async () => {
    await deleteSession();
    updateDashboard("loggedUser", null);
    removeLocalStorage("token");
    removeLocalStorage("user");

    redirectTo("/login");
  };

  return {
    error,
    loading,
    submitLogin,
    logout,
  };
};
