import { IAddress } from "./address.interface";
import { ICamera } from "./camera.interface";
import { IGroup } from "./group.interface";
import { IUser } from "./user.interface";

interface ICompany {
  id?: number;
  cnpj: string;
  razaoSocial: string;
  nomeResponsavelFinanceiro: string;
  emailFinanceiro: string;
  logoComputador?: string;
  logoCelular?: string;
  endereco: IAddress;
  grupos?: IGroup[];
  usuarios?: IUser[];
  cameras?: ICamera[];
  pagamentoEmDia: boolean;
  diaFechamento: number;
}

interface ICompanyTable {
  razaoSocial: string;
  cnpj?: string;
  nomeResponsavelFinanceiro: string;
  emailFinanceiro: string;
  pagamentoEmDia: boolean;
}

interface IGetAllCompaniesResponse {
  itens: ICompany[];
  contagemTotal: number;
}

export type { ICompany, ICompanyTable, IGetAllCompaniesResponse };
