import { TProfileName } from "../constants/profile-type";

interface ILoggedUser {
  email: string;
  name: string;
  primeiroAcesso: boolean;
  empresaId: string;
  perfil: TProfileName;
}

interface IAuthenticate {
  email: string;
  senha: string;
}

interface IAuthenticateResponse {
  login: {
    token: string;
    expiracao: string;
    nome: string;
    email: string;
    primeiroAcesso: boolean;
    empresaId: string;
    perfil: TProfileName;
  };
}

export type { IAuthenticate, IAuthenticateResponse, ILoggedUser };
