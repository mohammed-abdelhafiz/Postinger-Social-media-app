import {
  CreateCommentData,
  DeleteCommentData,
  EditCommentData,
  GetCommentLikesData,
  GetCommentsData,
  LikeCommentData,
} from "../types";
import api from "@/shared/lib/api";


export async function createComment({ postId, content }: CreateCommentData) {
  const res = await api.post(`/posts/${postId}/comments`, {
    content,
  });
  return res.data;
}

export async function getComments({ postId, pageParam }: GetCommentsData) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/posts/${postId}/comments?${params.toString()}`);
  return res.data;
}

export async function deleteComment({ commentId, postId }: DeleteCommentData) {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return res.data;
}

export async function editComment({
  content,
  commentId,
  postId,
}: EditCommentData) {
  const res = await api.put(`/posts/${postId}/comments/${commentId}`, {
    content,
  });
  return res.data;
}

export async function likeComment({ commentId, postId }: LikeCommentData) {
  const res = await api.post(`/posts/${postId}/comments/${commentId}/likes`);
  return res.data;
}

export async function unlikeComment({ commentId, postId }: LikeCommentData) {
  const res = await api.delete(`/posts/${postId}/comments/${commentId}/likes`);
  return res.data;
}

export async function getCommentLikes({
  commentId,
  pageParam,
  postId,
}: GetCommentLikesData) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(
    `/posts/${postId}/comments/${commentId}/likes?${params.toString()}`,
  );
  return res.data;
}
