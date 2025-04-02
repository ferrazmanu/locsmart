import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { ERROR_MESSAGE } from "@/src/components/error-message/error-message.constant";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { Select } from "@/src/components/select/select";
import { TSelectOptions } from "@/src/components/select/select.interfaces";
import { Toggle } from "@/src/components/toggle/toggle";
import { WarningMessage } from "@/src/components/warning-message/warning-message";
import { PROFILE_TYPE } from "@/src/constants/profile-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IAddress } from "@/src/interfaces/address.interface";
import { IError } from "@/src/interfaces/error.interface";
import { IUser } from "@/src/interfaces/user";
import { getAllCompanies } from "@/src/services/api/endpoints/company";
import { getAddressByCEP } from "@/src/services/api/endpoints/externals/cep";
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
import { IEditForm, formSchema } from "./modal-edit.schema";

interface IModalEdit {
  callbackFunc: () => void;
}

export const ModalEdit: React.FC<IModalEdit> = ({ callbackFunc }) => {
  const { modalState, updateModalEdit } = useModalContext();
  const dataId = modalState.modalEdit.data;

  const [errorResponse, setErrorResponse] = useState<IError>();

  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const [dataEdit, setDataEdit] = useState<IUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingSelectList, setIsLoadingSelectList] = useState<boolean>(true);
  const [listsSelect, setListsSelect] = useState({
    company: [] as TSelectOptions[],
    groups: [] as TSelectOptions[],
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
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    reset,
    getValues,
  } = form;

  const fetchCEP = async () => {
    const cep = watch("endereco.cep")?.replace(/\D/g, "");

    if (!cep) return;

    try {
      setLoadingAddress(true);

      const { data } = await getAddressByCEP(cep);

      if (data.erro) {
        setError("endereco.cep", {
          type: "manual",
          message: ERROR_MESSAGE["cep"],
        });
      } else {
        handlePopulateAddress(data);
        clearErrors("endereco.cep");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handlePopulateAddress = (data: IAddress) => {
    const formValues = getValues();

    setValue(
      "endereco.logradouro",
      data.logradouro || formValues.endereco.logradouro
    );
    setValue(
      "endereco.complemento",
      data.complemento || formValues.endereco.complemento
    );
    setValue("endereco.unidade", data.unidade || formValues.endereco.unidade);
    setValue("endereco.bairro", data.bairro || formValues.endereco.bairro);
    setValue(
      "endereco.localidade",
      data.localidade || formValues.endereco.localidade
    );
    setValue("endereco.uf", data.uf || formValues.endereco.uf);
    setValue("endereco.estado", data.estado || formValues.endereco.estado);
    setValue("endereco.regiao", data.regiao || formValues.endereco.regiao);
    setValue("endereco.ibge", data.ibge || formValues.endereco.ibge);
    setValue("endereco.gia", data.gia || formValues.endereco.gia);
    setValue("endereco.ddd", data.ddd || formValues.endereco.ddd);
    setValue("endereco.siafi", data.siafi || formValues.endereco.siafi);
  };

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
            <S.Content>
              <S.InlineFieldsWrapper>
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
                  <Label htmlFor="sobrenome">Sobrenome*</Label>
                  <Input
                    id="sobrenome"
                    {...register("sobrenome")}
                    placeholder="Sobrenome"
                    error={errors.sobrenome?.message}
                    maxLength={100}
                  />
                </S.Field>
              </S.InlineFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="email">E-mail*</Label>
                  <Input
                    id="email"
                    {...register("email")}
                    placeholder="E-mail"
                    error={errors.email?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="celular">Celular*</Label>
                  <MaskedInput
                    {...register("celular")}
                    placeholder="Celular"
                    error={errors?.celular?.message}
                    mask="(99)99999-9999"
                    disabled={loadingAddress}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="perfil">Tipo de Perfil*</Label>
                  <Select
                    initialOptions={PROFILE_TYPE}
                    title="Tipo de Perfil"
                    name="perfil"
                    hookForm={form}
                    error={errors.perfil?.message}
                    searchInput
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.InlineFieldsWrapper>
                <S.Field>
                  <Label htmlFor="grupoId">Grupo*</Label>
                  <Select
                    initialOptions={listsSelect.groups ?? []}
                    title="Grupo"
                    name="Grupo"
                    hookForm={form}
                    error={errors.grupoId?.message}
                    disabled
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
              </S.InlineFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="endereco.cep">CEP*</Label>
                  <MaskedInput
                    {...register("endereco.cep")}
                    placeholder="CEP"
                    error={errors?.endereco?.cep?.message}
                    mask="99999-999"
                    onBlur={fetchCEP}
                    disabled={loadingAddress}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="endereco.logradouro">Rua*</Label>
                  <Input
                    id="endereco.logradouro"
                    {...register("endereco.logradouro")}
                    placeholder="Rua"
                    error={errors?.endereco?.logradouro?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="endereco.unidade">Número</Label>
                  <MaskedInput
                    {...register("endereco.unidade")}
                    placeholder="Número"
                    error={errors?.endereco?.unidade?.message}
                    mask="999999"
                    disabled={loadingAddress}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="endereco.complemento">Complemento</Label>
                  <Input
                    id="endereco.complemento"
                    {...register("endereco.complemento")}
                    placeholder="Complemento"
                    error={errors?.endereco?.complemento?.message}
                    maxLength={100}
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.GridFieldsWrapper>
                <S.Field>
                  <Label htmlFor="endereco.estado">Estado*</Label>
                  <Input
                    id="endereco.estado"
                    {...register("endereco.estado")}
                    placeholder="Estado"
                    error={errors?.endereco?.estado?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="endereco.localidade">Cidade*</Label>
                  <Input
                    id="endereco.localidade"
                    {...register("endereco.localidade")}
                    placeholder="Cidade"
                    error={errors?.endereco?.localidade?.message}
                    maxLength={100}
                  />
                </S.Field>
                <S.Field>
                  <Label htmlFor="endereco.bairro">Bairro*</Label>
                  <Input
                    id="endereco.bairro"
                    {...register("endereco.bairro")}
                    placeholder="Bairro"
                    error={errors?.endereco?.bairro?.message}
                    maxLength={100}
                  />
                </S.Field>
              </S.GridFieldsWrapper>

              <S.Field>
                <Label htmlFor="ativo">Status</Label>
                <Toggle
                  hookForm={form}
                  name="ativo"
                  activeLabel="Usuário Ativo"
                  inactiveLabel="Usuário Inativo"
                />
              </S.Field>
            </S.Content>

            <WarningMessage>
              O celular informado será o utilizado para receber as notificações
              por WhatsApp.
            </WarningMessage>

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
