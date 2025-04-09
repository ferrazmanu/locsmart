import {
  emailRequired,
  numberRequired,
  stringRequired,
} from "@/src/utils/custom-schema-validations";
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

const notificationsSchema = z.object({
  email: z.boolean().optional(),
  blackList: z.boolean().optional(),
  whiteList: z.boolean().optional(),
  camera: z.boolean().optional(),
  smartList: z.boolean().optional(),
  accessList: z.boolean().optional(),

  somAlerta: z.boolean().optional(),
  popupBlackList: z.boolean().optional(),
  popupWhiteList: z.boolean().optional(),
  popupSmartList: z.boolean().optional(),
  popupAccessList: z.boolean().optional(),
});

const formSchema = z.object({
  nome: stringRequired,
  sobrenome: stringRequired,
  email: emailRequired,
  celular: stringRequired,
  endereco: addressSchema,
  empresaId: numberRequired,
  grupoIds: z.array(z.number()),
  perfil: numberRequired,
  ativo: z.boolean().optional(),
  notificacoes: notificationsSchema.optional(),
  telegramLinkCode: z.string().optional(),
});

export type IEditForm = z.infer<typeof formSchema>;

export { formSchema };
