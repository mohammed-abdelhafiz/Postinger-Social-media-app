import api from "@/lib/api";
import {
  LoginData,
  RegisterData,
  ResetPasswordData,
} from "../types/auth.schema";

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

export const requestResetPassword = async (
  resetPasswordData: ResetPasswordData,
) => {
  const response = await api.post(
    "/auth/request-reset-password",
    resetPasswordData,
  );
  return response.data;
};

export const createNewPassword = async ({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) => {
  const response = await api.post(`/auth//reset-password/${token}`, {
    newPassword,
  });
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
