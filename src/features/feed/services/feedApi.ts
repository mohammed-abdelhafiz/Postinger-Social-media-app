import api from "@/lib/api";
import { AxiosProgressEvent } from "axios";

export async function getAllPosts() {
  const res = await api.get("/posts");
  return res.data;
}

export async function createPost(data: {
  formData: FormData;
  handleProgress: (progressEvent: AxiosProgressEvent) => void;
}) {
  const res = await api.post("/posts", data.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: data.handleProgress,
  });
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}
