import {
  emailRequired,
  stringRequired,
} from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const formSchema = z.object({
  email: emailRequired,
  senha: stringRequired,
});

export type ILoginForm = z.infer<typeof formSchema>;

export { formSchema };
