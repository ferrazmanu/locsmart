import { deleteSession } from "@/src/app/lib/session";
import { getLocalStorage } from "@/src/utils/storage";
import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      deleteSession();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
