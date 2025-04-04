import { ICamera } from "@/src/interfaces/camera";
import api from "../axios";

const getAllCameras = () => api.get<ICamera[]>(`/cameras`);

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
