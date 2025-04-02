import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { TSelectOptions } from "@/src/components/select/select.interfaces";
import { Tabs } from "@/src/components/tabs/tabs";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IError } from "@/src/interfaces/error.interface";
import { IUser } from "@/src/interfaces/user";
import { getAllCompanies } from "@/src/services/api/endpoints/company";
import { getAllGroups } from "@/src/services/api/endpoints/group";
import {
  getUserById,
  postUser,
  putUser,
} from "@/src/services/api/endpoints/user";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { TabData } from "./(components)/(tab-data)/tab-data";
import { TabNotifications } from "./(components)/(tab-notifications)/tab-notifications";
import { TABS_OPTIONS } from "./modal-edit.constants";
import { IEditForm, formSchema } from "./modal-edit.schema";

interface IModalEdit {
  callbackFunc: () => void;
}

export const ModalEdit: React.FC<IModalEdit> = ({ callbackFunc }) => {
  const { modalState, updateModalEdit } = useModalContext();
  const dataId = modalState.modalEdit.data;

  const [errorResponse, setErrorResponse] = useState<IError>();

  const [dataEdit, setDataEdit] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSelectList, setIsLoadingSelectList] = useState<boolean>(true);
  const [listsSelect, setListsSelect] = useState({
    company: [] as TSelectOptions[],
    groups: [] as TSelectOptions[],
  });

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleCloseModal = () => {
    updateModalEdit("isOpen", false);
  };

  const form = useForm<IEditForm>({
    defaultValues: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const fetchDataById = async () => {
    setIsLoading(true);

    try {
      const { data } = await getUserById(dataId?.id);

      setDataEdit(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
        callbackFunc();
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
      Object.entries(dataEdit).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            setValue(`${key}.${subKey}` as keyof IEditForm, subValue as string);
          });
        } else {
          setValue(key as keyof IEditForm, value as string);
        }
      });
    }

    return () => {
      reset();
    };
  }, [dataEdit, setValue, reset]);

  useEffect(() => {
    if (!dataId) {
      setIsLoading(false);
      return;
    }
    fetchDataById();
  }, [dataId]);

  useEffect(() => {
    const fetchSelectData = async (
      fetchFunction: () => Promise<{ data: any[] }>,
      key: "company" | "groups"
    ) => {
      try {
        const { data } = await fetchFunction();

        const list = data.map((item) => ({
          value: item.id,
          name: `${item.razaoSocial || item.nome}`,
        }));

        setListsSelect((prev) => ({
          ...prev,
          [key]: list,
        }));
      } catch (error) {
        console.error(`Error fetching ${key} data:`, error);
      }
    };

    const fetchAllSelectData = async () => {
      setIsLoadingSelectList(true);
      await Promise.all([
        fetchSelectData(getAllCompanies, "company"),
        fetchSelectData(getAllGroups, "groups"),
      ]);
      setIsLoadingSelectList(false);
    };

    fetchAllSelectData();
  }, []);

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Novo"} Usuário`}
      handleCloseOnClick={handleCloseModal}
    >
      {isLoading || isLoadingSelectList ? (
        <Loading size="24" />
      ) : (
        <FormProvider {...form}>
          <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <Tabs
              tabsOptions={TABS_OPTIONS}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />

            {selectedTab === 0 && (
              <TabData hookForm={form} listsSelect={listsSelect} />
            )}

            {selectedTab === 1 && <TabNotifications hookForm={form} />}

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
              <Button type="submit" buttonStyle="hollow">
                Salvar
              </Button>
            </S.ButtonActions>
          </S.FormContainer>
        </FormProvider>
      )}
    </Modal>
  );
};
