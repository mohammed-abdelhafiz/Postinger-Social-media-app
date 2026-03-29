import {
  CreatePostData,
  DeletePostData,
  EditPostData,
  GetFeedPostsData,
  GetPostLikesData,
} from "@/features/posts/types";
import { toFormData } from "@/shared/lib/helperFuns";
import api from "@/shared/lib/api";


export async function getFeedPosts({ activeTab, pageParam }: GetFeedPostsData) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  params.append("filter", activeTab);
  const res = await api.get(`/posts/feed?${params.toString()}`);
  return res.data;
}

export async function createPost(postData: CreatePostData) {
  const formData = toFormData(postData);
  const res = await api.post("/posts", formData);
  return res.data;
}

export async function editPost(data: EditPostData) {
  const { postId, ...rest } = data;

  const formData = toFormData(rest);

  const res = await api.put(`/posts/${postId}`, formData);

  return res.data;
}

export async function deletePost({ postId }: DeletePostData) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}

export async function likePost(postId: string) {
  const res = await api.post(`/posts/${postId}/likes`);
  return res.data;
}

export async function unlikePost(postId: string) {
  const res = await api.delete(`/posts/${postId}/likes`);
  return res.data;
}

export async function getPostLikes({ postId, pageParam }: GetPostLikesData) {
  const params = new URLSearchParams();
  params.append("page", pageParam.toString());
  const res = await api.get(`/posts/${postId}/likes?${params.toString()}`);
  return res.data;
}
