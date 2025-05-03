import {
  numberRequired,
  stringRequired,
} from "@/src/utils/custom-schema-validations";
import { z } from "zod";

const stepCredenciais = z.object({
  phoneNumber: stringRequired,
  apiId: numberRequired,
  apiHash: stringRequired,
  cameraId: numberRequired,
});

export type ITelegramCredentialsForm = z.infer<typeof stepCredenciais>;

export { stepCredenciais };
