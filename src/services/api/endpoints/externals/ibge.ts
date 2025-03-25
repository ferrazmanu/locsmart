import api from "../../axios";

//para mais infos https://servicodados.ibge.gov.br/api/docs/localidades#api-_

const getCities = () =>
  api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes?orderBy=uf`
  );

const getStateByUF = (uf: string) =>
  api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}`);

const getCitiesByUF = (uf: string) =>
  api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );

const getCity = (city: string) =>
  api.get(
    `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${city}`
  );

const getAllCities = () =>
  api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`);

export { getAllCities, getCities, getCitiesByUF, getCity, getStateByUF };
