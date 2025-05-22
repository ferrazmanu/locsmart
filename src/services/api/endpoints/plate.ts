import { ILoggedUser } from "@/src/interfaces/logged-user.interface";
import { IGetAllPlatesResponse } from "@/src/interfaces/plate.interface";
import { ISearch } from "@/src/interfaces/search.interface";
import { getLocalStorage } from "@/src/utils/storage";
import api from "../axios";

const user: ILoggedUser | null = getLocalStorage("user");

const getAllPlates = (filters?: ISearch) =>
  api.get<IGetAllPlatesResponse>(`/leiturasplacas`, {
    params: {
      ...filters,
      empresaId: user?.empresaId,
    },
  });

const getPlateById = (id: number) => api.get(`/leiturasplacas/${id}`);

export { getAllPlates, getPlateById };
