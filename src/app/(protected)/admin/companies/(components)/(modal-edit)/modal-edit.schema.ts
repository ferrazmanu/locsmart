import { stringRequired } from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const addressSchema = z.object({
  cep: stringRequired,
  logradouro: stringRequired,
  unidade: z.string().optional().nullish(),
  complemento: z.string().optional().nullish(),
  uf: stringRequired,
  localidade: stringRequired,
  bairro: stringRequired,
  estado: stringRequired,
  regiao: stringRequired,
  ibge: stringRequired,
  gia: z.string().optional().nullish(),
  ddd: stringRequired,
  siafi: stringRequired,
});

const formSchema = z.object({
  razaoSocial: stringRequired,
  cnpj: stringRequired,
  nomeResponsavelFinanceiro: stringRequired,
  emailFinanceiro: stringRequired,
  endereco: addressSchema,
  // logoComputador: imageValidation,
  // logoCelular: imageValidation,
});

export type IEditForm = z.infer<typeof formSchema>;

export { formSchema };
