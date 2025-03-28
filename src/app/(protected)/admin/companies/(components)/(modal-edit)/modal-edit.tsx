import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { ERROR_MESSAGE } from "@/src/components/error-message/error-message.constant";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { IAddress } from "@/src/interfaces/address";
import { ICompany } from "@/src/interfaces/company";
import { IError } from "@/src/interfaces/error.interface";
import {
  getCompanyById,
  postCompany,
  putCompany,
} from "@/src/services/api/endpoints/company";
import { getAddressByCEP } from "@/src/services/api/endpoints/externals/cep";
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

  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);
  const [errorResponse, setErrorResponse] = useState<IError>();

  const [dataEdit, setDataEdit] = useState<ICompany | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      const { data } = await getCompanyById(dataId?.id);

      setDataEdit(data);
    } catch (error) {
      console.error("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    try {
      const dataToSend: IEditForm = {
        ...dataEdit,
        ...data,
        cnpj: removeMask(data.cnpj),
        endereco: {
          ...dataEdit?.endereco,
          ...data.endereco,
          cep: removeMask(data.endereco.cep),
        },
      };

      const response = dataEdit
        ? await putCompany(dataToSend)
        : await postCompany(dataToSend);

      if (response) {
        handleCloseModal();
        callbackFunc();
      }
    } catch (error) {
      if (isAxiosError<IError>(error)) {
        setErrorResponse(error?.response?.data);
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

  console.log(errors);

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Nova"} Empresa`}
      handleCloseOnClick={handleCloseModal}
    >
      {isLoading ? (
        <Loading size="24" />
      ) : (
        <FormProvider {...form}>
          <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
            <S.Content>
              <S.InlineFieldsWrapper>
                <S.Field>
                  <Label htmlFor="razaoSocial">Razão Social*</Label>
                  <Input
                    id="razaoSocial"
                    {...register("razaoSocial")}
                    placeholder="Razão Social"
                    error={errors.razaoSocial?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="cnpj">CNPJ*</Label>
                  <MaskedInput
                    id={`cnpj`}
                    {...form.register(`cnpj`)}
                    placeholder="CNPJ"
                    error={errors?.cnpj?.message}
                    mask={"99.999.999/9999-99"}
                  />
                </S.Field>
              </S.InlineFieldsWrapper>

              <S.InlineFieldsWrapper>
                <S.Field>
                  <Label htmlFor="nomeResponsavelFinanceiro">
                    Nome Responsável Financeiro*
                  </Label>
                  <Input
                    id="nomeResponsavelFinanceiro"
                    {...register("nomeResponsavelFinanceiro")}
                    placeholder="Nome Responsável Financeiro"
                    error={errors.nomeResponsavelFinanceiro?.message}
                    maxLength={100}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="emailFinanceiro">E-mail Financeiro*</Label>
                  <Input
                    id="emailFinanceiro"
                    {...register("emailFinanceiro")}
                    placeholder="E-mail Financeiro"
                    error={errors.emailFinanceiro?.message}
                    maxLength={100}
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
            </S.Content>

            {errorResponse && (
              <S.ButtonActions>
                <ErrorMessage>
                  Não foi possível salvar. Por favor, contate o suporte.
                </ErrorMessage>
              </S.ButtonActions>
            )}

            <S.ButtonActions>
              <Button
                type="submit"
                buttonStyle="primary"
                onClick={handleCloseModal}
              >
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
