import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { Label } from "@/src/components/label/label";
import { Modal } from "@/src/components/modal/modal";
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
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const queryClient = useQueryClient();

  const { modals, closeModal } = useModalContext();

  const modalData = modals.find((modal) => modal.type === "edit");
  const dataId = modalData?.data?.id;

  const { errorResponse, handleError } = useError();

  const { fetchGroupById, createOrUpdateGroup } = useGroup();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.GROUP, dataId],
    queryFn: () => fetchGroupById(dataId),
    enabled: !!dataId,
  });

  const form = useForm<IEditForm>({
    values: {
      ...dataEdit,
      cameraIds:
        (dataEdit && dataEdit.cameras?.map((item) => item.id || 0)) || [],
      usuarioIds:
        (dataEdit && dataEdit.usuarios?.map((item) => item.id || 0)) || [],
    } as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const empresaId = form.watch("empresaId");

  const { companySelectOptions, isLoading: isLoadingCompanies } = useCompany();
  const { userSelectOptions, isLoading: isLoadingUsers } = useUser({
    pagina: 1,
    empresaId: empresaId,
  });
  const { cameraSelectOptions, isLoading: isLoadingCameras } = useCamera({
    pagina: 1,
    empresaId: empresaId,
  });

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

  const allLoading = isLoading || isLoadingCompanies;

  const isLoadingSelect = isLoadingCameras || isLoadingUsers;

  return (
    <Modal
      size="lg"
      title={modalData?.title || ""}
      handleCloseOnClick={closeModal}
      isOpen={modalData?.type === "edit"}
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

              {empresaId && (
                <>
                  <S.Field>
                    <Label htmlFor="usuarioIds">Usuários*</Label>
                    <MultiCheckbox
                      initialOptions={userSelectOptions}
                      name="usuarioIds"
                      hookForm={form}
                      error={errors?.usuarioIds?.message}
                      searchInput
                      loading={isLoadingSelect}
                    />
                  </S.Field>

                  <S.Field>
                    <Label htmlFor="cameraIds">Câmeras*</Label>
                    <MultiCheckbox
                      initialOptions={cameraSelectOptions}
                      name="cameraIds"
                      hookForm={form}
                      error={errors?.cameraIds?.message}
                      searchInput
                      loading={isLoadingSelect}
                    />
                  </S.Field>
                </>
              )}
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
              <Button type="button" buttonStyle="primary" onClick={closeModal}>
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
