import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { MultiCheckbox } from "@/src/components/multi-checkbox/multi-checkbox";
import { Select } from "@/src/components/select/select";
import { Textarea } from "@/src/components/textarea/textarea";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCamera } from "@/src/hooks/useCamera";
import { useCompany } from "@/src/hooks/useCompany";
import { useError } from "@/src/hooks/useError";
import { useGroup } from "@/src/hooks/useGroup";
import { useUser } from "@/src/hooks/useUsers";
import { IGroup } from "@/src/interfaces/group.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const queryClient = useQueryClient();

  const { modalState, updateModalState } = useModalContext();
  const dataId = modalState.data?.id;

  const { errorResponse, handleError } = useError();

  const {
    fetchGroupById,
    refetch,
    postNewGroup,
    updateGroup,
    createOrUpdateGroup,
  } = useGroup();
  const { companySelectOptions, isLoading: isLoadingCompanies } = useCompany();
  const { userSelectOptions, isLoading: isLoadingUsers } = useUser();
  const { cameraSelectOptions, isLoading: isLoadingCameras } = useCamera();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.GROUP, dataId],
    queryFn: () => fetchGroupById(dataId),
    enabled: !!dataId,
  });

  const handleCloseModal = () => {
    updateModalState("isOpen", null);
  };

  const form = useForm<IEditForm>({
    defaultValues: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const mutation = useMutation({
    mutationFn: async (media: IGroup) => await createOrUpdateGroup(media),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKey.GROUP_LIST] }),
    onError: (error) => handleError(error),
  });

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    const dataToSend = {
      ...dataEdit,
      ...data,
    };

    await mutation.mutate(dataToSend);
  };

  useEffect(() => {
    if (dataEdit) {
      const dataToPopulate: IEditForm = {
        ...dataEdit,
        cameraIds: dataEdit.cameras?.map((item) => item.id || 0) || [],
        usuarioIds: dataEdit.usuarios?.map((item) => item.id || 0) || [],
      };

      reset(dataToPopulate);
    }

    return () => {
      reset();
    };
  }, [dataEdit, setValue, reset]);

  const allLoading =
    isLoading || isLoadingCameras || isLoadingCompanies || isLoadingUsers;

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Novo"} Grupo`}
      handleCloseOnClick={handleCloseModal}
    >
      {allLoading ? (
        <Loading size="24" />
      ) : (
        <FormProvider {...form}>
          <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Content>
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
                <Label htmlFor="descricao">Descrição</Label>
                <Textarea
                  id="descricao"
                  {...form.register("descricao")}
                  placeholder="Descrição..."
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

              <S.Field>
                <Label htmlFor="usuarioIds">Usuários</Label>
                <MultiCheckbox
                  initialOptions={userSelectOptions}
                  name="usuarioIds"
                  hookForm={form}
                  error={errors?.usuarioIds?.message}
                />
              </S.Field>

              <S.Field>
                <Label htmlFor="cameraIds">Câmeras</Label>
                <MultiCheckbox
                  initialOptions={cameraSelectOptions}
                  name="cameraIds"
                  hookForm={form}
                  error={errors?.cameraIds?.message}
                />
              </S.Field>
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

            <S.ButtonActions>
              <Button buttonStyle="primary" onClick={handleCloseModal}>
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
          </S.FormContainer>
        </FormProvider>
      )}
    </Modal>
  );
};
