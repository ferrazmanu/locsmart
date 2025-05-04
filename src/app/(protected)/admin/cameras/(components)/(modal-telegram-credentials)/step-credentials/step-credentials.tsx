import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { NumberInput } from "@/src/components/input/input.number";
import { Label } from "@/src/components/label/label";
import * as S from "@/src/components/modal/modal.styles";
import { Tooltip } from "@/src/components/tooltip/tooltip";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCredential } from "@/src/hooks/useCredential";
import { useError } from "@/src/hooks/useError";
import { ICredential } from "@/src/interfaces/credential.interface";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import {
  ITelegramCredentialsForm,
  stepCredenciais,
} from "./step-credentials.schema";

export const StepCredential: React.FC = () => {
  const { modals, closeModal, setTopActiveStep } = useModalContext();

  const cameraId = modals.find((modal) => modal.type === "edit")?.data?.id;
  const dataId = modals.find((modal) => modal.type === "telegram-credential")
    ?.data?.id;

  const { errorResponse, handleError } = useError();
  const { fetchCredentialById, createOrUpdateCredential } = useCredential();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.CREDENTIAL, dataId],
    queryFn: () => fetchCredentialById(dataId),
    enabled: !!dataId,
  });

  const form = useForm<ITelegramCredentialsForm>({
    defaultValues: {
      ...(dataEdit as ITelegramCredentialsForm),
      cameraId: cameraId,
    },
    resolver: zodResolver(stepCredenciais),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const mutation = useMutation({
    mutationFn: async (credential: ICredential) =>
      await createOrUpdateCredential(credential),
    onError: (error) => handleError(error),
  });

  const onSubmitCredentials: SubmitHandler<ITelegramCredentialsForm> = async (
    data
  ) => {
    const dataToSend: ICredential = {
      ...dataEdit,
      ...data,
      phoneNumber: `+${removeMask(data.phoneNumber)}`,
    };
    setTopActiveStep(2);

    await mutation.mutate(dataToSend);
  };

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit);
    }

    return () => {
      reset();
    };
  }, [dataEdit, setValue, reset]);

  return (
    <>
      {isLoading ? (
        <Loading size="24" />
      ) : (
        <FormProvider {...form}>
          <S.FormContainer onSubmit={handleSubmit(onSubmitCredentials)}>
            <S.Content>
              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="apiId">
                    API ID*
                    <Tooltip text="Para descobrir, acesse: https://my.telegram.org/">
                      <MdOutlineInfo size={14} color="#000" />
                    </Tooltip>
                  </Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="apiId"
                    format="integer"
                    maxLength={8}
                    error={errors?.apiId?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="apiHash">
                    API Hash*
                    <Tooltip text="Para descobrir, acesse: https://my.telegram.org/">
                      <MdOutlineInfo size={14} color="#000" />
                    </Tooltip>
                  </Label>
                  <Input
                    id="apiHash"
                    {...register("apiHash")}
                    placeholder="Nome"
                    error={errors.apiHash?.message}
                    maxLength={100}
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="phoneNumber">Telefone*</Label>
                  <MaskedInput
                    {...register("phoneNumber")}
                    placeholder="Telefone"
                    error={errors?.phoneNumber?.message}
                    mask="+99(99)99999-9999"
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="cameraId">Câmera ID*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="cameraId"
                    format="integer"
                    maxLength={5}
                    error={errors?.cameraId?.message}
                  />
                </S.Field>
              </S.GridFieldsWrapper>
            </S.Content>

            {errorResponse && (
              <S.ButtonActions>
                <ErrorMessage>
                  Não foi possível salvar. Por favor, contate o suporte.{" "}
                  {errorResponse.status &&
                    `Status code: ${errorResponse.status}.`}
                </ErrorMessage>
              </S.ButtonActions>
            )}

            <S.SpacedButtons>
              <S.ButtonActions>
                <Button
                  type="button"
                  buttonStyle="primary"
                  onClick={closeModal}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  buttonStyle="hollow"
                  loading={mutation.isPending}
                >
                  Salvar Credenciais
                </Button>
              </S.ButtonActions>
            </S.SpacedButtons>
          </S.FormContainer>
        </FormProvider>
      )}
    </>
  );
};
