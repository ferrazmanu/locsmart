import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { useGroup } from "@/src/hooks/useGroup";
import { useUser } from "@/src/hooks/useUsers";
import { IError } from "@/src/interfaces/error.interface";
import { postUser, putUser } from "@/src/services/api/endpoints/user";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TabData } from "./(components)/(tab-data)/tab-data";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const { modalState, updateModalEdit } = useModalContext();
  const dataId = modalState.modalEdit.data?.id;

  const [errorResponse, setErrorResponse] = useState<IError>();

  const { fetchUserById, refetch } = useUser();
  const { companySelectOptions, isLoading: isLoadingCompanies } = useCompany();
  const { groupSelectOptions, isLoading: isLoadingGroups } = useGroup();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.USER, dataId],
    queryFn: () => fetchUserById(dataId),
    enabled: !!dataId,
  });

  // const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleCloseModal = () => {
    updateModalEdit("isOpen", false);
  };

  const form = useForm<IEditForm>({
    defaultValues: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    try {
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

      const response = dataEdit
        ? await putUser(dataToSend)
        : await postUser(dataToSend);

      if (response) {
        handleCloseModal();
        refetch();
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        setErrorResponse({
          status: error?.status,
          code: error?.code,
          message: error?.message,
          stackTrace: error?.stack,
          title: error?.name,
        });
      }
    }
  };

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit);
    }

    return () => {
      reset();
    };
  }, [dataEdit, setValue, reset]);

  const allLoading = isLoading || isLoadingCompanies || isLoadingGroups;

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Novo"} Usuário`}
      handleCloseOnClick={handleCloseModal}
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
              <Button buttonStyle="primary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" buttonStyle="hollow" loading={isSubmitting}>
                Salvar
              </Button>
            </S.ButtonActions>
          </S.FormContainer>
        </FormProvider>
      )}
    </Modal>
  );
};
