import { IGetAllPlatesResponse } from "@/src/interfaces/plate.interface";
import { ISearch } from "@/src/interfaces/search.interface";
import api from "../axios";

const getAllPlates = (filters?: ISearch) =>
  api.get<IGetAllPlatesResponse>(`/leiturasplacas`, {
    params: filters,
  });

const getPlateById = (id: number) => api.get(`/leiturasplacas/${id}`);

export { getAllPlates, getPlateById };
