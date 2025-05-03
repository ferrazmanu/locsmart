import { IStep } from "@/src/contexts/modal/modal.interface";
import { stepCodigoLogin } from "./step-code/step-code.schema";
import { stepCredenciais } from "./step-credentials/step-credentials.schema";

const STEPS_LIST: IStep[] = [
  {
    id: 1,
    title: "Credenciais Telegram",
    schema: stepCredenciais,
    current: true,
  },
  {
    id: 2,
    title: "Código de Verificação",
    schema: stepCodigoLogin,
    current: false,
  },
];

export { STEPS_LIST };
