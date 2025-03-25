import api from "../../axios";

const getAddressByCEP = (cep: string) =>
  api.get(
    `https://viacep.com.br/ws/${cep}/json/
    `
  );

export { getAddressByCEP };
