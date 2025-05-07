import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { NumberInput } from "@/src/components/input/input.number";
import { Label } from "@/src/components/label/label";
import * as S from "@/src/components/modal/modal.styles";
import { Tooltip } from "@/src/components/tooltip/tooltip";
import { queryKey } from "@/src/constants/query-keys";
import { useDashboardContext } from "@/src/contexts/dashboard/dashboard.context";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCredential } from "@/src/hooks/useCredential";
import { ICredential } from "@/src/interfaces/credential.interface";
import { IError } from "@/src/interfaces/error.interface";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineInfo } from "react-icons/md";
import {
  ITelegramCredentialsForm,
  stepCredenciais,
} from "./step-credentials.schema";

export const StepCredential: React.FC = () => {
  const { modals, closeModal, setTopActiveStep, updateTopModal } =
    useModalContext();

  const { showToast } = useDashboardContext();

  const cameraId = modals.find((modal) => modal.type === "edit")?.data?.id;
  const dataId = modals.find((modal) => modal.type === "telegram-credential")
    ?.data?.id;

  const { fetchCredentialById, createOrUpdateCredential } = useCredential();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.CREDENTIAL, dataId],
    queryFn: () => fetchCredentialById(dataId),
    enabled: !!dataId,
  });

  const form = useForm<ITelegramCredentialsForm>({
    values: {
      ...(dataEdit as ITelegramCredentialsForm),
      cameraId: cameraId,
    },
    resolver: zodResolver(stepCredenciais),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const handleIfStepChange = () => {
    if (dataEdit) {
      const phoneNumber = form.getValues("phoneNumber");

      const newPhone = `+${removeMask(phoneNumber)}`;
      const oldPhone = `+${removeMask(dataEdit?.phoneNumber)}`;

      if (newPhone !== oldPhone) {
        setTopActiveStep(2);
      } else {
        closeModal();
      }
    } else {
      setTopActiveStep(2);
    }
  };

  const mutation = useMutation({
    mutationFn: async (credential: ICredential) =>
      await createOrUpdateCredential(credential),
    onError: (error) => {
      if (isAxiosError<IError>(error)) {
        const errorMessage = error?.response?.data?.error;
        if (errorMessage) {
          showToast(errorMessage, "error");

          if (errorMessage.includes("Você não tem permissão")) {
            handleIfStepChange();
          }
          if (
            errorMessage.includes(
              "provide a config value for verification_code"
            )
          ) {
            handleIfStepChange();
          }
        } else {
          showToast(error?.message, "error");
        }
      }
    },
    onSuccess: () => {
      handleIfStepChange();
    },
  });

  const onSubmitCredentials: SubmitHandler<ITelegramCredentialsForm> = async (
    data
  ) => {
    const dataToSend: ICredential = {
      ...dataEdit,
      ...data,
      phoneNumber: `+${removeMask(data.phoneNumber)}`,
    };

    await mutation.mutate(dataToSend);
  };

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
                    maxLength={9}
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
                    disabled
                  />
                </S.Field>
              </S.GridFieldsWrapper>
            </S.Content>

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
                  disabled={mutation.isPending}
                >
                  Salvar
                </Button>
              </S.ButtonActions>
            </S.SpacedButtons>
          </S.FormContainer>
        </FormProvider>
      )}
    </>
  );
};
