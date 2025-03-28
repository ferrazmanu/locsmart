import { ICompany } from "@/src/interfaces/company";
import api from "../axios";

const getAllCompanies = () => api.get<ICompany[]>(`/empresas`);

const getCompanyById = (id: number) => api.get(`/empresas/${id}`);

const postCompany = (data: ICompany) => api.post(`/empresas`, data);

const putCompany = (data: ICompany) => api.put(`/empresas/${data.id}`, data);

const deleteCompanyById = (id: number) => api.delete(`/empresas/${id}`);

export {
  deleteCompanyById,
  getAllCompanies,
  getCompanyById,
  postCompany,
  putCompany,
};
