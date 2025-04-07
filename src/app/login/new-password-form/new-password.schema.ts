import { stringRequired } from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const formSchema = z.object({
  senhaAtual: stringRequired,
  novaSenha: stringRequired,
});

export type INewPasswordForm = z.infer<typeof formSchema>;

export { formSchema };
