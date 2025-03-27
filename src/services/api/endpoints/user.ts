import { IUser } from "@/src/interfaces/user";
import api from "../axios";

const getAllUsers = () => api.get<IUser[]>(`/usuarios`);

export { getAllUsers };
