interface IGroup {
  id?: number;
  nome: string;
  descricao?: string;
  empresaId: number;
  usuarios: number[];
  cameras: number[];
}

interface IGroupTable {
  nome: string;
  cameras: number;
  usuarios: number;
  descricao: string;
}

export type { IGroup, IGroupTable };
