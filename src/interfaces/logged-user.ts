interface ILoggedUser {
  username: string;
  email: string;
  name: string;
}

interface IAuthenticate {
  username: string;
  password: string;
}

interface IAuthenticateResponse extends ILoggedUser {
  token: string;
}

export type { IAuthenticate, IAuthenticateResponse, ILoggedUser };
