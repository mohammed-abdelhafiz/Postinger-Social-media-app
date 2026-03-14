import api from "@/lib/api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (userIdOrUsername: string) => {
  const response = await api.get(`/users/${userIdOrUsername}`);
  return response.data;
};
