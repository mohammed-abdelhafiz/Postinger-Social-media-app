import api from "@/lib/api";
import { CreatePostFormData } from "../types/feed.schema";

export async function getAllPosts() {
  const res = await api.get("/posts");
  return res.data;
}

export async function createPost(data: CreatePostFormData) {
  const res = await api.post("/posts", data);
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}
