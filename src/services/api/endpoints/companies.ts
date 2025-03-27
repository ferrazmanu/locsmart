import { ICompany } from "@/src/interfaces/company";
import api from "../axios";

const getAllCompanies = () => api.get<ICompany[]>(`/empresas`);

export { getAllCompanies };
