import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { PasswordInput } from "@/src/components/input/input.password";
import { Label } from "@/src/components/label/label";
import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { useLogin } from "@/src/hooks/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Logo from "../../../../public/logo-transparente.png";
import * as S from "../login.styles";
import { ILoginForm, formSchema } from "./login.schema";

export const LoginForm: React.FC = () => {
  const { loading, submitLogin, error } = useLogin();
  const { showToast } = useDashboardContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasShownToast = useRef(false);

  const form = useForm<ILoginForm>({
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const from = searchParams.get("from");
    if (from === "unauthorized" && !hasShownToast.current) {
      hasShownToast.current = true;
      showToast("Sessão expirada. Faça login novamente.", "error");
      router.replace(window.location.pathname);
    }
  }, [searchParams, showToast, router]);

  return (
    <>
      <FormProvider {...form}>
        <S.Form onSubmit={handleSubmit(submitLogin)}>
          <S.Logo>
            <Image alt="Logo LocSmart" src={Logo} />
          </S.Logo>
          <S.Text>
            Digite seu e-mail e senha para acessar o painel de administração .
          </S.Text>

          <S.Fields>
            <S.Field>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                {...register("email")}
                placeholder="Seu e-mail"
                error={errors.email?.message}
                maxLength={100}
                disabled={loading}
              />
            </S.Field>

            <S.Field>
              <Label htmlFor="senha">Senha</Label>
              <PasswordInput
                id="senha"
                {...register("senha")}
                placeholder="Sua senha"
                error={errors.senha?.message}
                maxLength={100}
                disabled={loading}
              />
            </S.Field>
          </S.Fields>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Button
            type="submit"
            buttonStyle="primary"
            loading={loading}
            disabled={loading}
          >
            Entrar
          </Button>
        </S.Form>
      </FormProvider>
    </>
  );
};
