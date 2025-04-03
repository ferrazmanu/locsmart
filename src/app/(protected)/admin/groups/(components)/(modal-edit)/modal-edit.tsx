import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { MultiCheckbox } from "@/src/components/multi-checkbox/multi-checkbox";
import { Select } from "@/src/components/select/select";
import { TSelectOptions } from "@/src/components/select/select.interfaces";
import { Textarea } from "@/src/components/textarea/textarea";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IError } from "@/src/interfaces/error.interface";
import { IGroup } from "@/src/interfaces/group";
import { getAllCameras } from "@/src/services/api/endpoints/camera";
import { getAllCompanies } from "@/src/services/api/endpoints/company";
import {
  getGroupById,
  postGroup,
  putGroup,
} from "@/src/services/api/endpoints/group";
import { getAllUsers } from "@/src/services/api/endpoints/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IEditForm, formSchema } from "./modal-edit.schema";

interface IModalEdit {
  callbackFunc: () => void;
}

export const ModalEdit: React.FC<IModalEdit> = ({ callbackFunc }) => {
  const { modalState, updateModalEdit } = useModalContext();
  const dataId = modalState.modalEdit.data;

  const [errorResponse, setErrorResponse] = useState<IError>();

  const [dataEdit, setDataEdit] = useState<IGroup | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSelectList, setIsLoadingSelectList] = useState<boolean>(true);
  const [listsSelect, setListsSelect] = useState({
    company: [] as TSelectOptions[],
    users: [] as TSelectOptions[],
    cameras: [] as TSelectOptions[],
  });

  const handleCloseModal = () => {
    updateModalEdit("isOpen", false);
  };

  const form = useForm<IEditForm>({
    defaultValues: dataEdit as IEditForm,
    resolver: zodResolver(formSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = form;

  const fetchDataById = async () => {
    setIsLoading(true);

    try {
      const { data } = await getGroupById(dataId?.id);

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
      };

      const response = dataEdit
        ? await putGroup(dataToSend)
        : await postGroup(dataToSend);

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
    const fetchSelectData = async (
      fetchFunction: () => Promise<{ data: any[] }>,
      key: "company" | "users" | "cameras"
    ) => {
      try {
        const { data } = await fetchFunction();

        const list = data.map((item) => ({
          value: item.id,
          name: `${item.razaoSocial || item.nome} ${
            key === "users" ? `- ${item.email}` : ""
          }`,
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
        fetchSelectData(getAllUsers, "users"),
        fetchSelectData(getAllCameras, "cameras"),
      ]);
      setIsLoadingSelectList(false);
    };

    fetchAllSelectData();
  }, []);

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

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Novo"} Grupo`}
      handleCloseOnClick={handleCloseModal}
    >
      {isLoading || isLoadingSelectList ? (
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
                  initialOptions={listsSelect.company ?? []}
                  title="Empresa"
                  name="empresaId"
                  hookForm={form}
                  error={errors.empresaId?.message}
                  searchInput
                />
              </S.Field>

              <S.Field>
                <Label htmlFor="usuarios">Usuários</Label>
                <MultiCheckbox
                  initialOptions={listsSelect.users ?? []}
                  name="usuarios"
                  hookForm={form}
                  error={errors?.usuarios?.message}
                />
              </S.Field>

              <S.Field>
                <Label htmlFor="cameras">Câmeras</Label>
                <MultiCheckbox
                  initialOptions={listsSelect.cameras ?? []}
                  name="cameras"
                  hookForm={form}
                  error={errors?.cameras?.message}
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
