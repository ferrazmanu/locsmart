import { getLocalStorage } from "@/src/utils/storage";
import axios from "axios";

const api = axios.create({
  baseURL: "/",
});

api.interceptors.request.use(
  (config) => {
    try {
      const token = getLocalStorage("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => Promise.reject(error)
);

export default api;
