import { ERROR_MESSAGE } from "@/src/components/error-message/error-message.constant";
import { Input } from "@/src/components/input/input.default";
import { MaskedInput } from "@/src/components/input/input.masked";
import { Label } from "@/src/components/label/label";
import * as S from "@/src/components/modal/modal.styles";
import { Select } from "@/src/components/select/select";
import { TSelectOptions } from "@/src/components/select/select.interfaces";
import { Toggle } from "@/src/components/toggle/toggle";
import { WarningMessage } from "@/src/components/warning-message/warning-message";
import { PROFILE_TYPE } from "@/src/constants/profile-type";
import { IAddress } from "@/src/interfaces/address.interface";
import { getAddressByCEP } from "@/src/services/api/endpoints/externals/cep";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IEditForm } from "../../modal-edit.schema";

interface ITabData {
  hookForm: UseFormReturn<IEditForm>;
  listsSelect: {
    company: TSelectOptions[];
    groups: TSelectOptions[];
  };
}

export const TabData: React.FC<ITabData> = ({ hookForm, listsSelect }) => {
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
    getValues,
  } = hookForm;

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

  return (
    <>
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
              hookForm={hookForm}
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
              hookForm={hookForm}
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
              hookForm={hookForm}
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
            hookForm={hookForm}
            name="ativo"
            activeLabel="Usuário Ativo"
            inactiveLabel="Usuário Inativo"
          />
        </S.Field>
      </S.Content>

      <WarningMessage>
        O celular informado será o utilizado para receber as notificações por
        WhatsApp.
      </WarningMessage>
    </>
  );
};
