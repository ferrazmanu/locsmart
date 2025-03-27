import { IGroup } from "@/src/interfaces/group";
import api from "../axios";

const getAllGroups = () => api.get<IGroup[]>(`/grupos`);

export { getAllGroups };
