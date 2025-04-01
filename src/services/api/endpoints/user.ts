import { IUser } from "@/src/interfaces/user";
import api from "../axios";

const getAllUsers = () => api.get<IUser[]>(`/usuarios`);

const getUserById = (id: number) => api.get(`/usuarios/${id}`);

const postUser = (data: IUser) => api.post(`/usuarios`, data);

const putUser = (data: IUser) => api.put(`/usuarios/${data.id}`, data);

const deleteUserById = (id: number) => api.delete(`/usuarios/${id}`);

export { deleteUserById, getAllUsers, getUserById, postUser, putUser };
