import { ICamera } from "./camera.interface";
import { IUser } from "./user.interface";

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

interface IGetAllGroupsResponse {
  itens: IGroup[];
  contagemTotal: number;
}

export type { IGetAllGroupsResponse, IGroup, IGroupTable };
