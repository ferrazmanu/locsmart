import { IAddress } from "./address";

interface IUser {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  perfil: number;
  celular: string;
  ativo?: boolean;
  endereco: IAddress;
  empresaId: number;
  telegramLinkCode?: string;
}

interface IUserTable {
  nome: string;
  email: string;
  perfil: string;
  status: string;
  empresa: string;
}

export type { IUser, IUserTable };
