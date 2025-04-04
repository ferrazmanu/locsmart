import { ICamera } from "./camera";
import { IUser } from "./user";

interface IGroup {
  id?: number;
  nome: string;
  descricao?: string;
  empresaId: number;
  usuarioIds?: number[];
  cameraIds?: number[];
  cameras?: ICamera[];
  usuarios?: IUser[];
}

interface IGroupTable {
  nome: string;
  cameras: number;
  usuarios: number;
  descricao: string;
}

export type { IGroup, IGroupTable };
