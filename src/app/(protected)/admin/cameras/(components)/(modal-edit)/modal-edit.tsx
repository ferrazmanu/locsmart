import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { Input } from "@/src/components/input/input.default";
import { NumberInput } from "@/src/components/input/input.number";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { Select } from "@/src/components/select/select";
import { BRAND } from "@/src/constants/brand";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCamera } from "@/src/hooks/useCamera";
import { useCompany } from "@/src/hooks/useCompany";
import { ICamera } from "@/src/interfaces/camera.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { STEPS_LIST } from "../(modal-telegram-credentials)/modal-telegram-credential.constants";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const queryClient = useQueryClient();

  const { modals, closeModal, openModal, updateTopModal } = useModalContext();

  const modalData = modals.find((modal) => modal.type === "edit");
  const dataId = modalData?.data?.id;

  const { fetchCameraById, createOrUpdateCamera } = useCamera();
  const { companySelectOptions, isLoading: isLoadingCompanies } = useCompany();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.CAMERA, dataId],
    queryFn: () => fetchCameraById(dataId),
    enabled: !!dataId,
  });

  const form = useForm<IEditForm>({
    values: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const mutation = useMutation({
    mutationFn: async (media: ICamera) => await createOrUpdateCamera(media),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKey.CAMERA_LIST] }),
  });

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    const dataToSend = {
      ...dataEdit,
      ...data,
      resolucao: {
        ...dataEdit?.resolucao,
        ...data.resolucao,
      },
    };

    await mutation.mutate(dataToSend);
  };

  useEffect(() => {
    updateTopModal("steps", STEPS_LIST);
    updateTopModal("title", "Dados do Solicitante");
  }, []);

  return (
    <Modal
      size="lg"
      title={modalData?.title || ""}
      handleCloseOnClick={closeModal}
      isOpen={modalData?.type === "edit"}
    >
      {isLoading || isLoadingCompanies ? (
        <Loading size="24" />
      ) : (
        <FormProvider {...form}>
          <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Content>
              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="nome">Nome*</Label>
                  <Input
                    id="nome"
                    {...register("nome")}
                    placeholder="Nome"
                    error={errors.nome?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="empresaId">Empresa*</Label>
                  <Select
                    initialOptions={companySelectOptions}
                    title="Empresa"
                    name="empresaId"
                    hookForm={form}
                    error={errors.empresaId?.message}
                    searchInput
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="marca">Marca*</Label>
                  <Select
                    initialOptions={BRAND}
                    title="Marca"
                    name="marca"
                    hookForm={form}
                    error={errors.marca?.message}
                    searchInput
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="modelo">Modelo*</Label>
                  <Input
                    id="modelo"
                    {...register("modelo")}
                    placeholder="Modelo"
                    error={errors.modelo?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="tipoEquipamento">Tipo de Equipamento*</Label>
                  <Select
                    initialOptions={EQUIPMENT_TYPE}
                    title="Tipo de Equipamento"
                    name="tipoEquipamento"
                    hookForm={form}
                    error={errors.tipoEquipamento?.message}
                    searchInput
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="dominioIp">Domínio/IP*</Label>
                  <Input
                    id="dominioIp"
                    {...register("dominioIp")}
                    placeholder="Domínio/IP"
                    error={errors.dominioIp?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="portaRtsp">Porta RTSP*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="portaRtsp"
                    format="integer"
                    maxLength={5}
                    error={errors?.portaRtsp?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="portaHttp">Porta HTTP*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="portaHttp"
                    format="integer"
                    maxLength={5}
                    error={errors?.portaRtsp?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="rekorScoutId">Rekor Scout Id*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="rekorScoutId"
                    format="integer"
                    maxLength={50}
                    error={errors?.rekorScoutId?.message}
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="canal">Canal*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="canal"
                    format="integer"
                    maxLength={5}
                    error={errors?.canal?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="stream">Stream*</Label>
                  <Input
                    id="stream"
                    {...register("stream")}
                    placeholder="Stream"
                    error={errors.stream?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="resolucao.largura">Resolução - Width*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="resolucao.largura"
                    format="integer"
                    maxLength={4}
                    error={errors?.resolucao?.altura?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="resolucao.altura">Resolução - Height*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="resolucao.altura"
                    format="integer"
                    maxLength={4}
                    error={errors?.resolucao?.altura?.message}
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.InlineFieldsWrapper>
                <S.Field>
                  <Label htmlFor="enderecoRtsp">Endereço RTSP*</Label>
                  <Input
                    id="enderecoRtsp"
                    {...register("enderecoRtsp")}
                    placeholder="Endereço RTSP"
                    error={errors.enderecoRtsp?.message}
                    maxLength={200}
                  />
                </S.Field>
              </S.InlineFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="usuarioDvr">Usuário Câmera/DVR*</Label>
                  <Input
                    id="usuarioDvr"
                    {...register("usuarioDvr")}
                    placeholder="Usuário Câmera/DVR"
                    error={errors.usuarioDvr?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="senhaDvr">Senha Câmera/DVR*</Label>
                  <Input
                    id="senhaDvr"
                    {...register("senhaDvr")}
                    placeholder="Senha Câmera/DVR"
                    error={errors.senhaDvr?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="fps">FPS*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="fps"
                    format="integer"
                    maxLength={3}
                    error={errors?.fps?.message}
                  />
                </S.Field>
              </S.GridFieldsWrapper>
            </S.Content>

            <S.SpacedButtons>
              {!!dataEdit && (
                <div style={{ width: "100%" }}>
                  <Button
                    type="button"
                    buttonStyle="primary"
                    onClick={() =>
                      openModal({
                        type: "telegram-credential",
                        title: "Credencial Telegram",
                        data: dataEdit?.credencial,
                        steps: STEPS_LIST,
                      })
                    }
                  >
                    {dataEdit.credencial?.id ? `Editar` : "+"} Credencial
                    Telegram
                  </Button>
                </div>
              )}

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
                  Salvar
                </Button>
              </S.ButtonActions>
            </S.SpacedButtons>
          </S.FormContainer>
        </FormProvider>
      )}
    </Modal>
  );
};
