import api from "@/lib/api";
import { AxiosProgressEvent } from "axios";
import { Post } from "@/features/feed/types/feed.types";

export async function getPosts({activeTab, pageParam}: {activeTab: string, pageParam: number}) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  params.append("filter", activeTab);
  const res = await api.get(`/posts?${params.toString()}`);
  return res.data;
}

export interface CreatePostData {
  formData: FormData;
  handleProgress: (progressEvent: AxiosProgressEvent) => void;
}
export async function createPost(data: CreatePostData) {
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

export interface DeletePostData {
  postId: string;
}
export async function deletePost({postId}: DeletePostData) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}

export interface CreateCommentData {
  postId: string;
  content: string;
}
export async function createComment(data: CreateCommentData) {
  const res = await api.post(`/posts/${data.postId}/comments`, {
    content: data.content,
  });
  return res.data;
}
export async function getComments({postId, pageParam}: {postId: string, pageParam: number}) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/posts/${postId}/comments?${params.toString()}`);
  return res.data;
}

export interface DeleteCommentData {
  commentId: string;
}
export async function deleteComment({commentId}: DeleteCommentData) {
  const res = await api.delete(`/comments/${commentId}`);
  return res.data;
}

export interface EditCommentData {
  commentId: string;
  content: string;
}
export async function editComment(data: EditCommentData) {
  const res = await api.put(`/comments/${data.commentId}`, {
    content:data.content
  });
  return res.data;
}

export async function likeComment(commentId: string) {
  const res = await api.post(`/comments/${commentId}/likes`);
  return res.data;
}

export async function getPostLikes({postId, pageParam}: {postId: string, pageParam: number}) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/posts/${postId}/likes?${params.toString()}`);
  return res.data;
}

export async function getCommentLikes({commentId, pageParam}: {commentId: string, pageParam: number}) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/comments/${commentId}/likes?${params.toString()}`);
  return res.data;
}
