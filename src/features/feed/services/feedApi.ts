import api from "@/lib/api";
import { AxiosProgressEvent } from "axios";

export async function getPosts(activeTab?: string, pageParam: number = 1) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  if (activeTab) {
    params.append("filter", activeTab);
  }
  const res = await api.get(`/posts?${params.toString()}`);
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
