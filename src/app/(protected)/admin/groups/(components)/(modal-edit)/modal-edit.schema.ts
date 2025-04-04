import {
  numberArrayRequired,
  numberRequired,
  stringRequired,
} from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const formSchema = z.object({
  nome: stringRequired,
  descricao: z.string().optional(),
  empresaId: numberRequired,
  usuarioIds: numberArrayRequired,
  cameraIds: numberArrayRequired,
});

export type IEditForm = z.infer<typeof formSchema>;

export { formSchema };
