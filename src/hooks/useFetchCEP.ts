import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IAddress } from "../interfaces/address.interface";
import { getAddressByCEP } from "../services/api/endpoints/externals/cep";

interface IUseCEP {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  parentField?: string;
  fields?: string[];
}

export const useFetchCEP = ({ form, parentField, fields }: IUseCEP) => {
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const { setValue, setError, clearErrors, getValues } = form;
  const fieldName = `${parentField ? `${parentField}.` : ""}cep`;

  const fetchCEP = async () => {
    const cep = getValues(fieldName)?.replace(/\D/g, "");

    if (!cep) return;

    try {
      setLoadingAddress(true);
      const { data } = await getAddressByCEP(cep);

      if (data.erro) {
        setError(fieldName, {
          type: "manual",
          message: "CEP inválido",
        });
      } else {
        handlePopulateAddress(data);
        clearErrors(fieldName);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handlePopulateAddress = (data: IAddress) => {
    const formValues = getValues();

    const fieldsToPopulate = fields || [
      "logradouro",
      "complemento",
      "unidade",
      "bairro",
      "localidade",
      "uf",
      "estado",
      "regiao",
      "ibge",
      "gia",
      "ddd",
      "siafi",
    ];

    fieldsToPopulate.forEach((field) => {
      setValue(
        `${parentField ? `${parentField}.` : ""}${field}`,
        data[field as keyof IAddress] || formValues[field]
      );
    });
  };

  return { fetchCEP, loadingAddress };
};
