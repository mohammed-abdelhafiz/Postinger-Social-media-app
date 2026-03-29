import { User } from "@/features/users/types";

export interface CreateCommentData {
  postId: string;
  content: string;
}

export interface GetCommentsData {
  postId: string;
  pageParam: number;
}

export interface DeleteCommentData {
  postId: string;
  commentId: string;
}

export interface EditCommentData {
  postId: string;
  commentId: string;
  content: string;
}

export interface LikeCommentData {
  postId: string;
  commentId: string;
}

export interface GetCommentLikesData {
  postId: string;
  commentId: string;
  pageParam: number;
}

export interface Comment {
  _id: string;
  author: User;
  postId: string;
  content: string;
  isLiked: boolean;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsQueryPage {
  data: Comment[];
  hasNextPage: boolean;
  nextPage: number;
}
