import api from "@/lib/api";
import { AxiosProgressEvent } from "axios";
import { Post } from "@/features/feed/types/feed.types";

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

export async function editPost(data: {
  postId: string;
  formData: FormData;
}): Promise<Post> {
  const res = await api.put(`/posts/${data.postId}`, data.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export async function deletePost(postId: string) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}

export async function createComment(data: { postId: string; content: string }) {
  const res = await api.post(`/posts/${data.postId}/comments`, {
    content: data.content,
  });
  return res.data;
}
export async function getComments(postId: string, pageParam: number = 1) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/posts/${postId}/comments?${params.toString()}`);
  return res.data;
}

export async function deleteComment(commentId: string) {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
}

export async function editComment(data: {
  commentId: string;
  content: string;
}) {
  const res = await api.put(`/comments/${data.commentId}`, {
    content:data.content
  });
  return res.data;
}
