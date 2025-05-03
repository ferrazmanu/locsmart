import { stringRequired } from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const stepCodigoLogin = z.object({
  codigo: stringRequired,
});

export type ITelegramCodeForm = z.infer<typeof stepCodigoLogin>;

export { stepCodigoLogin };
