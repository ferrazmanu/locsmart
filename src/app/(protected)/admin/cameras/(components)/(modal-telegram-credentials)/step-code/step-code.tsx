import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { Label } from "@/src/components/label/label";
import * as S from "@/src/components/modal/modal.styles";
import { Tooltip } from "@/src/components/tooltip/tooltip";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCredential } from "@/src/hooks/useCredential";
import { useError } from "@/src/hooks/useError";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import { ITelegramCodeForm } from "./step-code.schema";

export const StepCode: React.FC = () => {
  const { closeModal, updateTopModal } = useModalContext();

  const { errorResponse, handleError } = useError();
  const { postNewCredentialCode } = useCredential();

  const form = useForm<ITelegramCodeForm>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: async (code: string) => await postNewCredentialCode(code),
    onError: (error) => handleError(error),
  });

  const onSubmitCredentials: SubmitHandler<ITelegramCodeForm> = async (
    data
  ) => {
    await mutation.mutate(data.codigo);
  };

  useEffect(() => {
    updateTopModal("title", "Credenciais Telegram - Código de Verificação");
  }, []);

  return (
    <FormProvider {...form}>
      <S.FormContainer onSubmit={handleSubmit(onSubmitCredentials)}>
        <S.Content>
          <S.Field>
            <Label htmlFor="codigo">
              Código de Verificação*
              <Tooltip text="Código recebido em seu telegram">
                <MdOutlineInfo size={14} color="#000" />
              </Tooltip>
            </Label>
            <Input
              id="codigo"
              {...register("codigo")}
              placeholder="Código"
              error={errors.codigo?.message}
              maxLength={100}
            />
          </S.Field>
        </S.Content>

        {errorResponse && (
          <S.ButtonActions>
            <ErrorMessage>
              Não foi possível salvar. Por favor, contate o suporte.{" "}
              {errorResponse.status && `Status code: ${errorResponse.status}.`}
            </ErrorMessage>
          </S.ButtonActions>
        )}

        <S.SpacedButtons>
          <S.ButtonActions>
            <Button type="button" buttonStyle="primary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button
              type="submit"
              buttonStyle="hollow"
              loading={mutation.isPending}
              disabled={mutation.isPending}
            >
              Enviar
            </Button>
          </S.ButtonActions>
        </S.SpacedButtons>
      </S.FormContainer>
    </FormProvider>
  );
};
