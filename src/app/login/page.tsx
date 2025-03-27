"use client";

import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { ERROR_MESSAGE } from "@/src/components/error-message/error-message.constant";
import { Input } from "@/src/components/input/input.default";
import { PasswordInput } from "@/src/components/input/input.password";
import { Label } from "@/src/components/label/label";
import { useLogin } from "@/src/hooks/useLogin";
import Logo from "../../../public/logo-transparente.png";
import { ILogin } from "./login.interfaces";
import * as S from "./login.styles";

import Image from "next/image";

export default function Login() {
  const { loading, submitLogin, error } = useLogin();

  const form = useForm<ILogin>();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <S.Wrapper>
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
              <Label htmlFor="username">Login</Label>
              <Input
                id="username"
                {...register("username", {
                  required: ERROR_MESSAGE["required"],
                })}
                placeholder="Login"
                error={errors.username?.message}
                maxLength={100}
                disabled={loading}
              />
            </S.Field>

            <S.Field>
              <Label htmlFor="password">Senha</Label>
              <PasswordInput
                id="password"
                {...register("password", {
                  required: ERROR_MESSAGE["required"],
                })}
                placeholder="Senha"
                error={errors.password?.message}
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
    </S.Wrapper>
  );
}
