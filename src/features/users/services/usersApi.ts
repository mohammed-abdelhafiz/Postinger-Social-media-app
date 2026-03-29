import api from "@/shared/lib/api";
import { GetUserPostsParams, User } from "../types";

export const getUserProfile = async (username: string): Promise<User> => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export const getFollowSuggestions = async ({
  pageParam,
}: {
  pageParam: number;
}) => {
  const response = await api.get(`/users/followSuggestions?page=${pageParam}`);
  return response.data;
};


export const followUser = async ({ username }: { username: string }) => {
  const response = await api.post(`/users/${username}/follow`);
  return response.data;
};

export const unfollowUser = async ({ username }: { username: string }) => {
  const response = await api.delete(`/users/${username}/follow`);
  return response.data;
};

export const getUserPosts = async ({
  pageParam,
  activeTab,
  username,
}: GetUserPostsParams) => {
  const response = await api.get(
    `/users/${username}/posts?page=${pageParam}&filter=${activeTab}`,
  );
  return response.data;
};
