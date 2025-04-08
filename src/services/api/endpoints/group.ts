import {
  IGetAllGroupsResponse,
  IGroup,
} from "@/src/interfaces/group.interface";
import api from "../axios";

const getAllGroups = () => api.get<IGetAllGroupsResponse>(`/grupos`);

const getGroupById = (id: number) => api.get(`/grupos/${id}`);

const postGroup = (data: IGroup) => api.post(`/grupos`, data);

const putGroup = (data: IGroup) => api.put(`/grupos/${data.id}`, data);

const deleteGroupById = (id: number) => api.delete(`/grupos/${id}`);

export { deleteGroupById, getAllGroups, getGroupById, postGroup, putGroup };
