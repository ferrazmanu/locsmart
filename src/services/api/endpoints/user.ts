import { ISearch } from "@/src/interfaces/search.interface";
import {
  IGetAllUsersResponse,
  IUser,
  IUserPassword,
} from "@/src/interfaces/user.interface";
import api from "../axios";

const getAllUsers = (filters?: ISearch) =>
  api.get<IGetAllUsersResponse>(`/usuarios`, {
    params: filters,
  });

const getUserById = (id: number) => api.get(`/usuarios/${id}`);

const postUser = (data: IUser) => api.post(`/usuarios`, data);

const putUser = (data: IUser) => api.put(`/usuarios/${data.id}`, data);

const deleteUserById = (id: number) => api.delete(`/usuarios/${id}`);

const putUserPassword = (data: IUserPassword) =>
  api.put(`/usuarios/atualizar-senha/`, null, {
    params: {
      senhaAtual: data.senhaAtual,
      novaSenha: data.novaSenha,
    },
  });

export {
  deleteUserById,
  getAllUsers,
  getUserById,
  postUser,
  putUser,
  putUserPassword,
};
