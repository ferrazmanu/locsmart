interface IPlate {
  id?: number;
  criadoEm: string | Date;
  atualizadoEm: string | Date;
  placa: string;
  imagemPlaca: string;
  imagemVeiculo: string;
  modelo: string;
  cor: string;
  empresaId: number;
  cameraId: number;
}

interface IPlateTable {}

interface IGetAllPlatesResponse {
  itens: IPlate[];
  contagemTotal: number;
}

export type { IGetAllPlatesResponse, IPlate, IPlateTable };
