interface ILoggedUser {
  email: string;
  name: string;
  primeiroAcesso: boolean;
}

interface IAuthenticate {
  email: string;
  senha: string;
}

interface IAuthenticateResponse extends ILoggedUser {
  login: {
    token: string;
    expiracao: string;
    nome: string;
    email: string;
    primeiroAcesso: boolean;
  };
}

export type { IAuthenticate, IAuthenticateResponse, ILoggedUser };
