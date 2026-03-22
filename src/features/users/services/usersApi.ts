import api from "@/lib/api";

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUser = async (userIdOrUsername: string) => {
  const response = await api.get(`/users/${userIdOrUsername}`);
  return response.data;
};

export const getFollowSuggestions = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await api.get(`/users/follow-suggestions?page=${pageParam}`);
  return response.data;
};

export interface FollowUserData {
  userId: string;
}

export const followUser = async ({ userId }: FollowUserData) => {
  const response = await api.post(`/users/${userId}/follow`);
  return response.data;
};
