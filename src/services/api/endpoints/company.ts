import {
  ICompany,
  IGetAllCompaniesResponse,
} from "@/src/interfaces/company.interface";
import api from "../axios";

const getAllCompanies = () => api.get<IGetAllCompaniesResponse>(`/empresas`);

const getCompanyById = (id: number) => api.get(`/empresas/${id}`);

const postCompany = (data: ICompany) => api.post(`/empresas`, data);

const putCompany = (data: ICompany) => api.put(`/empresas/${data.id}`, data);

const putCompanyPayment = (id: number) =>
  api.put(`/empresas/registrar-pagamento/${id}`);

const deleteCompanyById = (id: number) => api.delete(`/empresas/${id}`);

export {
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  postCompany,
  putCompany,
  putCompanyPayment,
};
