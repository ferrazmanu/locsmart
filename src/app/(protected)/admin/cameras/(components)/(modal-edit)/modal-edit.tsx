import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { NumberInput } from "@/src/components/input/input.number";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { Select } from "@/src/components/select/select";
import { TSelectOptions } from "@/src/components/select/select.interfaces";
import { BRAND } from "@/src/constants/brand";
import { EQUIPMENT_TYPE } from "@/src/constants/equipment-type";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { ICamera } from "@/src/interfaces/camera";
import { IError } from "@/src/interfaces/error.interface";
import {
  getCameraById,
  postCamera,
  putCamera,
} from "@/src/services/api/endpoints/camera";
import { getAllCompanies } from "@/src/services/api/endpoints/company";
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

  const [dataEdit, setDataEdit] = useState<ICamera | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [companyList, setCompanyList] = useState<TSelectOptions[] | undefined>(
    undefined
  );

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
    setValue,
    reset,
  } = form;

  const fetchDataById = async () => {
    setIsLoading(true);

    try {
      const { data } = await getCameraById(dataId?.id);

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
        resolucao: {
          ...dataEdit?.resolucao,
          ...data.resolucao,
        },
      };

      const response = dataEdit
        ? await putCamera(dataToSend)
        : await postCamera(dataToSend);

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

  useEffect(() => {
    const fetchCompanyList = async () => {
      setIsLoading(true);

      try {
        const { data } = await getAllCompanies();

        const list: TSelectOptions[] = data.map((item) => ({
          value: item.id,
          name: item.razaoSocial,
        }));

        setCompanyList(list);
      } catch (error) {
        console.error("error: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyList();
  }, []);

  return (
    <Modal
      size="lg"
      title={`${dataEdit ? "Editar" : "Nova"} Câmera`}
      handleCloseOnClick={handleCloseModal}
    >
      {isLoading ? (
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
                    initialOptions={companyList ?? []}
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

            {errorResponse && (
              <S.ButtonActions>
                <ErrorMessage>
                  Não foi possível salvar. Por favor, contate o suporte.
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
