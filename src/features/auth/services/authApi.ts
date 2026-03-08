import api from "@/lib/api";
import { LoginData, RegisterData } from "../types/auth.schema";

export const register = async (registerData: RegisterData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};
export const login = async (loginData: LoginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh-access-token");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
