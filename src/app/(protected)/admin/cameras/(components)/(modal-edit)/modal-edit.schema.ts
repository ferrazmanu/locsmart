import {
  numberRequired,
  stringRequired,
} from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const resolutionSchema = z.object({
  largura: numberRequired,
  altura: numberRequired,
});

const formSchema = z.object({
  nome: stringRequired,
  marca: numberRequired,
  modelo: stringRequired,
  tipoEquipamento: numberRequired,
  dominioIp: stringRequired,
  portaRtsp: numberRequired,
  portaHttp: numberRequired,
  canal: numberRequired,
  stream: stringRequired,
  enderecoRtsp: stringRequired,
  usuarioDvr: stringRequired,
  senhaDvr: stringRequired,
  fps: numberRequired,
  resolucao: resolutionSchema,
  empresaId: numberRequired,
});

export type IEditForm = z.infer<typeof formSchema>;

export { formSchema };
