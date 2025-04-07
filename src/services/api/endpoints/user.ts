import {
  IGetAllUsersResponse,
  IUser,
  IUserPassword,
} from "@/src/interfaces/user";
import api from "../axios";

const getAllUsers = () => api.get<IGetAllUsersResponse>(`/usuarios`);

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
