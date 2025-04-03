import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { IAddress } from "../interfaces/address.interface";
import { getAddressByCEP } from "../services/api/endpoints/externals/cep";

interface IUseCEP {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  parentField?: string;
}

export const useFetchCEP = ({ form, parentField }: IUseCEP) => {
  const [loadingAddress, setLoadingAddress] = useState<boolean>(false);

  const { watch, setValue, setError, clearErrors, getValues } = form;

  const fetchCEP = async () => {
    const cep = watch(`${parentField && parentField + "."}cep`)?.replace(
      /\D/g,
      ""
    );

    if (!cep) return;

    try {
      setLoadingAddress(true);
      const { data } = await getAddressByCEP(cep);

      if (data.erro) {
        setError(`${parentField && parentField + "."}cep`, {
          type: "manual",
          message: "CEP inválido",
        });
      } else {
        handlePopulateAddress(data);
        clearErrors(`${parentField && parentField + "."}cep`);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    } finally {
      setLoadingAddress(false);
    }
  };

  const handlePopulateAddress = (data: IAddress) => {
    const formValues = getValues();

    const fields = [
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

    fields.forEach((field) => {
      setValue(
        `${parentField && parentField + "."}${field}`,
        data[field as keyof IAddress] || formValues.endereco[field]
      );
    });
  };

  return { fetchCEP, loadingAddress };
};
