import { IAddress } from "./address";

interface IUser {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  perfil: number;
  celular: string;
  ativo: boolean;
  endereco: IAddress;
  empresaId: number;
}

interface IUserTable {
  nome: string;
  email: string;
  perfil: string;
}

export type { IUser, IUserTable };
