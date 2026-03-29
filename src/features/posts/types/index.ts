import { User } from "@/shared/types";
import * as z from "zod";
import { createPostSchema, editPostSchema } from "./schema";

export interface Post {
  _id: string;
  author: User;
  content: {
    text?: string;
    image?: {
      url: string;
      publicId: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface UploadedImage {
  file: File;
  preview: string;
}

export interface PostsQueryPage {
  data: Post[];
  hasNextPage: boolean;
  nextPage: number;
}

export interface UsersQueryPage {
  data: User[];
  hasNextPage: boolean;
  nextPage: number;
}

export interface GetFeedPostsData {
  activeTab: string;
  pageParam: number;
}

export type CreatePostData = z.infer<typeof createPostSchema>;

export type EditPostData = z.infer<typeof editPostSchema>;

export interface DeletePostData {
  postId: string;
}

export interface GetPostLikesData {
  postId: string;
  pageParam: number;
}
