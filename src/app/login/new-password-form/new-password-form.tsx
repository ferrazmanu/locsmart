import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { PasswordInput } from "@/src/components/input/input.password";
import { Label } from "@/src/components/label/label";
import { useError } from "@/src/hooks/useError";
import { useRedirect } from "@/src/hooks/useRedirect";
import { useUser } from "@/src/hooks/useUsers";
import { IUserPassword } from "@/src/interfaces/user.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Logo from "../../../../public/logo-transparente.png";
import * as S from "../login.styles";
import { INewPasswordForm, formSchema } from "./new-password.schema";

export const NewPasswordForm: React.FC = () => {
  const { updateUserPassword } = useUser();
  const { handleError, errorResponse } = useError();
  const { redirectTo } = useRedirect();

  const form = useForm<INewPasswordForm>({
    resolver: zodResolver(formSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: IUserPassword) => await updateUserPassword(data),
    onError: (error) => handleError(error),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<INewPasswordForm> = async (
    data: INewPasswordForm
  ) => {
    await mutation.mutate(data);
  };

  return (
    <>
      <FormProvider {...form}>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.Logo>
            <Image alt="Logo LocSmart" src={Logo} />
          </S.Logo>
          <S.Text>
            <p>
              A senha inicial é uma senha padrão disponibilizada a você por nós.
            </p>
            <p> Digite a senha atual e uma nova, para poder alterar.</p>
          </S.Text>

          <S.Fields>
            <S.Field>
              <Label htmlFor="senhaAtual">Senha Atual*</Label>
              <PasswordInput
                id="senhaAtual"
                {...register("senhaAtual")}
                placeholder="Senha Atual*"
                error={errors.senhaAtual?.message}
                maxLength={100}
                disabled={mutation.isPending}
              />
            </S.Field>

            <S.Field>
              <Label htmlFor="novaSenha">Nova Senha*</Label>
              <PasswordInput
                id="novaSenha"
                {...register("novaSenha")}
                placeholder="Nova Senha*"
                error={errors.novaSenha?.message}
                maxLength={100}
                disabled={mutation.isPending}
              />
            </S.Field>
          </S.Fields>

          {errorResponse && (
            <ErrorMessage>
              Não foi possível salvar. Por favor, contate o suporte.{" "}
              {errorResponse.status && `Status code: ${errorResponse.status}.`}
            </ErrorMessage>
          )}

          <S.ButtonActions>
            <Button
              type="button"
              buttonStyle="hollow"
              loading={mutation.isPending}
              disabled={mutation.isPending}
              onClick={() =>
                redirectTo(`${process.env.NEXT_PUBLIC_HOME_REDIRECT}`)
              }
            >
              Continuar Sem Alterar
            </Button>
            <Button
              type="submit"
              buttonStyle="primary"
              loading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Salvar
            </Button>
          </S.ButtonActions>
        </S.Form>
      </FormProvider>
    </>
  );
};
