import {
  ICredential,
  IGetAllCredentialsResponse,
} from "@/src/interfaces/credential.interface";
import { ISearch } from "@/src/interfaces/search.interface";
import api from "../axios";

const getAllCredentials = (filters?: ISearch) =>
  api.get<IGetAllCredentialsResponse>(`/credenciais`, {
    params: filters,
  });

const getCredentialById = (id: number) => api.get(`/credenciais/${id}`);

const postCredential = (data: ICredential) => api.post(`/credenciais`, data);

const postCredentialCode = (code: string) =>
  api.post(`/credenciais/codigoLogin/${code}`);

const putCredential = (data: ICredential) =>
  api.put(`/credenciais/${data.id}`, data);

const deleteCredentialById = (id: number) => api.delete(`/credenciais/${id}`);

export {
  deleteCredentialById,
  getAllCredentials,
  getCredentialById,
  postCredential,
  postCredentialCode,
  putCredential,
};
