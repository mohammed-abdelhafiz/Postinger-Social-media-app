import api from "@/shared/lib/api";
import {
  ForgotPasswordData,
  ResetPasswordData,
  RegisterData,
  LoginData,
} from "../types";


export const register = async (registerData: RegisterData) => {
  const response = await api.post("/auth/register", registerData);
  return response.data;
};
export const login = async (loginData: LoginData) => {
  const response = await api.post("/auth/login", loginData);
  return response.data;
};

export const refreshToken = async () => {
  const response = await api.post("/auth/refresh");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const forgotPassword = async (
  forgotPasswordData: ForgotPasswordData,
) => {
  const response = await api.post("/auth/forgot-password", forgotPasswordData);
  return response.data;
};

export const resetPassword = async (resetPasswordData: ResetPasswordData) => {
  const response = await api.post(
    `/auth/reset-password/${resetPasswordData.token}`,
    {
      newPassword: resetPasswordData.newPassword,
    },
  );
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
