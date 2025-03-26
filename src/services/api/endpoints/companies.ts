import { ICompany } from "@/src/interfaces/company";
import api from "../axios";

const getCompanies = () => api.get<ICompany[]>(`/empresas`);

export { getCompanies };
