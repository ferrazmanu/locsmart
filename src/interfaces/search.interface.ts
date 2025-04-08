import { Dayjs } from "dayjs";

interface ISearch {
  dataInicial?: Dayjs;
  dataFinal?: Dayjs;
  pesquisa?: string;
  pagina: number;
  tamanhoPagina?: number;
}

export type { ISearch };
