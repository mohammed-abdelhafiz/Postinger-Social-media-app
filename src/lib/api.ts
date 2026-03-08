import axios from "axios";
import { ApiError } from "./apiError";
import { useAuthStore } from "@/store/authStore";
import { refreshToken } from "@/features/auth/services/authApi";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh-access-token" &&
      originalRequest.url !== "/auth/login"
    ) {
      originalRequest._retry = true;
      try {
        const { accessToken } = await refreshToken();
        useAuthStore.getState().setAccessToken(accessToken);
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

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
