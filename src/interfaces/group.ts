import { ICamera } from "./camera";
import { IUser } from "./user";

interface IGroup {
  id: number;
  nome: string;
  descricao: string;
  empresaId: number;
  usuarios: IUser[];
  cameras: ICamera[];
}

interface IGroupTable {
  nome: string;
  cameras: number;
  usuarios: number;
  descricao: string;
}

export type { IGroup, IGroupTable };
