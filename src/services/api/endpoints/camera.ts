import { ICamera } from "@/src/interfaces/camera";
import api from "../axios";

const getAllCameras = () => api.get<ICamera[]>(`/cameras`);

export { getAllCameras };
