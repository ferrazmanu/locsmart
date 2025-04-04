import { IAddress } from "./address";
import { ICamera } from "./camera";
import { IGroup } from "./group";
import { IUser } from "./user";

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
}

interface ICompanyTable {
  razaoSocial: string;
  cnpj?: string;
  nomeResponsavelFinanceiro: string;
  emailFinanceiro: string;
}

export type { ICompany, ICompanyTable };
