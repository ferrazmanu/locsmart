import api from "../axios";

const getCompanies = () => api.get(`/empresas`);

export { getCompanies };
