import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { useError } from "@/src/hooks/useError";
import { useGroup } from "@/src/hooks/useGroup";
import { useUser } from "@/src/hooks/useUsers";
import { IUser } from "@/src/interfaces/user.interface";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TabData } from "./(tab-data)/tab-data";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const queryClient = useQueryClient();

  const { modals, closeModal } = useModalContext();

  const modalData = modals.find((modal) => modal.type === "edit");
  const dataId = modalData?.data?.id;

  const { errorResponse, handleError } = useError();

  const { fetchUserById, createOrUpdateUser } = useUser();

  const { companySelectOptions, isLoading: isLoadingCompanies } = useCompany();
  const { groupSelectOptions, isLoading: isLoadingGroups } = useGroup();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.USER, dataId],
    queryFn: () => fetchUserById(dataId),
    enabled: !!dataId,
  });

  // const [selectedTab, setSelectedTab] = useState<number>(0);

  const form = useForm<IEditForm>({
    values: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const { handleSubmit, setValue, reset } = form;

  const mutation = useMutation({
    mutationFn: async (media: IUser) => await createOrUpdateUser(media),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKey.USER_LIST] }),
    onError: (error) => handleError(error),
  });

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    const dataToSend = {
      ...dataEdit,
      ...data,
      celular: removeMask(data.celular),
      endereco: {
        ...dataEdit?.endereco,
        ...data.endereco,
        cep: removeMask(data.endereco.cep),
      },
    };

    await mutation.mutate(dataToSend);
  };

  const allLoading = isLoading || isLoadingCompanies || isLoadingGroups;

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
            {/* <Tabs
              tabsOptions={TABS_OPTIONS}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            /> */}

            {/* {selectedTab === 0 && ( */}
            <TabData
              hookForm={form}
              listsSelect={{
                company: companySelectOptions,
                groups: groupSelectOptions,
              }}
            />
            {/* )} */}

            {/* {selectedTab === 1 && <TabNotifications hookForm={form} />} */}

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
