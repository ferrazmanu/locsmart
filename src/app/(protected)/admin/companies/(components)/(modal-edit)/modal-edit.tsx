import { Loading } from "@/src/assets";
import { Button } from "@/src/components/button/button";
import { ErrorMessage } from "@/src/components/error-message/error-message";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { NumberInput } from "@/src/components/input/input.number";
import { Label } from "@/src/components/label/label";
import Modal from "@/src/components/modal/modal";
import * as S from "@/src/components/modal/modal.styles";
import { queryKey } from "@/src/constants/query-keys";
import { useModalContext } from "@/src/contexts/modal/modal.context";
import { useCompany } from "@/src/hooks/useCompany";
import { useError } from "@/src/hooks/useError";
import { useFetchCEP } from "@/src/hooks/useFetchCEP";
import { ICompany } from "@/src/interfaces/company";
import { removeMask } from "@/src/utils/format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { IEditForm, formSchema } from "./modal-edit.schema";

export const ModalEdit: React.FC = () => {
  const { modalState, updateModalState } = useModalContext();
  const dataId = modalState.data?.id;

  const { errorResponse, handleError } = useError();

  const { fetchCompanyById, refetch, updateCompany, postNewCompany } =
    useCompany();

  const { data: dataEdit, isLoading } = useQuery({
    queryKey: [queryKey.COMPANY, dataId],
    queryFn: () => fetchCompanyById(dataId),
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

  const { fetchCEP, loadingAddress } = useFetchCEP({
    form: form,
    parentField: "endereco",
  });

  const cepValue = form.watch("endereco.cep");

  const putMutation = useMutation({
    mutationFn: async (media: ICompany) => await updateCompany(media),
    onSuccess: () => refetch(),
    onError: (error) => handleError(error),
  });

  const postMutation = useMutation({
    mutationFn: async (media: ICompany) => await postNewCompany(media),
    onSuccess: () => refetch(),
    onError: (error) => handleError(error),
  });

  const onSubmit: SubmitHandler<IEditForm> = async (data) => {
    const dataToSend = {
      ...dataEdit,
      ...data,
      pagamentoEmDia: dataEdit?.pagamentoEmDia || false,
      cnpj: removeMask(data.cnpj),
      endereco: {
        ...dataEdit?.endereco,
        ...data.endereco,
        cep: removeMask(data.endereco.cep),
      },
    };

    dataEdit
      ? await putMutation.mutate(dataToSend)
      : await postMutation.mutate(dataToSend);
  };

  useEffect(() => {
    if (dataEdit) {
      reset(dataEdit);
    }

    return () => {
      reset();
    };
  }, [dataEdit, setValue, reset]);

  useEffect(() => {
    if (cepValue && cepValue.length > 8) {
      fetchCEP();
    }
  }, [cepValue]);

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

                <S.Field>
                  <Label htmlFor="diaFechamento">Dia de Fechamento*</Label>
                  <NumberInput
                    placeholder="0"
                    hookForm={form}
                    name="diaFechamento"
                    format="integer"
                    maxLength={5}
                    error={errors?.diaFechamento?.message}
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

              {/* <S.InlineFieldsWrapper>
                <S.Field>
                  <Label htmlFor="logoComputador">Logo Computador</Label>
                  <ImageInput
                    placeholder="Logo Computador"
                    hookForm={form}
                    name="logoComputador"
                    error={errors?.logoComputador?.message}
                  />
                </S.Field>

                <S.Field>
                  <Label htmlFor="logoCelular">Logo Celular</Label>
                  <ImageInput
                    placeholder="Logo Celular"
                    hookForm={form}
                    name="logoCelular"
                    error={errors?.logoCelular?.message}
                  />
                </S.Field>
              </S.InlineFieldsWrapper>*/}
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
              <Button
                type="submit"
                buttonStyle="primary"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                buttonStyle="hollow"
                loading={postMutation.isPending || putMutation.isPending}
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
