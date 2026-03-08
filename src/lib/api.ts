import axios from "axios";
import { ApiError } from "./apiError";
import { useAuthStore } from "@/store/authStore";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error?.message ||
      error.response?.data?.message ||
      "Something went wrong";

    const path = error.response?.data?.error?.path;
    const status = error.response?.status;

    return Promise.reject(new ApiError(message, status, path));
  },
);

export default api;
