import {
  ICamera,
  IGetAllCamerasResponse,
} from "@/src/interfaces/camera.interface";
import { ISearch } from "@/src/interfaces/search.interface";
import api from "../axios";

const getAllCameras = (filters?: ISearch) =>
  api.get<IGetAllCamerasResponse>(`/cameras`, {
    params: filters,
  });

const getCameraById = (id: number) => api.get(`/cameras/${id}`);

const postCamera = (data: ICamera) => api.post(`/cameras`, data);

const putCamera = (data: ICamera) => api.put(`/cameras/${data.id}`, data);

const deleteCameraById = (id: number) => api.delete(`/cameras/${id}`);

export {
  deleteCameraById,
  getAllCameras,
  getCameraById,
  postCamera,
  putCamera,
};
