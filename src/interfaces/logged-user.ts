interface ILoggedUser {
  email: string;
  name: string;
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
  };
}

export type { IAuthenticate, IAuthenticateResponse, ILoggedUser };
