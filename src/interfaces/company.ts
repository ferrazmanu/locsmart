import { IAddress } from "./address";

interface ICompany {
  id?: number;
  cnpj: string;
  razaoSocial: string;
  nomeResponsavelFinanceiro: string;
  emailFinanceiro: string;
  logoComputador?: FileList;
  logoCelular?: FileList;
  endereco: IAddress;
}

interface ICompanyTable {
  razaoSocial: string;
  cnpj?: string;
  nomeResponsavelFinanceiro: string;
  emailFinanceiro: string;
}

export type { ICompany, ICompanyTable };
