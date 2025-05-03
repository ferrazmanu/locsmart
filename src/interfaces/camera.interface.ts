interface IResolucao {
  id?: number;
  largura: number;
  altura: number;
}

interface ICamera {
  id?: number;
  nome: string;
  marca: number;
  modelo: string;
  tipoEquipamento: number;
  dominioIp?: string;
  portaRtsp: number;
  portaHttp: number;
  canal: number;
  stream: string;
  enderecoRtsp: string;
  usuarioDvr: string;
  senhaDvr: string;
  fps: number;
  resolucao?: IResolucao;
  empresaId?: number;
  rekorScoutId: number;
  credencial?: string;
}

interface ICameraTable {
  nome: string;
  enderecoRtsp: string;
  tipoEquipamento: string;
}

interface IGetAllCamerasResponse {
  itens: ICamera[];
  contagemTotal: number;
}

export type { ICamera, ICameraTable, IGetAllCamerasResponse };
