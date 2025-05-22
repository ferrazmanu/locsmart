import { Dayjs } from "dayjs";

interface ISearch {
  dataInicial?: Dayjs;
  dataFinal?: Dayjs;
  pesquisa?: string;
  pagina: number;
  tamanhoPagina?: number;
  empresaId?: string | number;
}

export type { ISearch };
