import {
  IAuthenticate,
  IAuthenticateResponse,
} from "@/src/interfaces/logged-user";
import api from "@/src/services/api/axios";

const authenticate = (data: IAuthenticate) =>
  api.post<IAuthenticateResponse>(`/autenticacao/login`, data);

export { authenticate };
