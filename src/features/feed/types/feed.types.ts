import { User } from "@/types";

export interface Post {
  _id: string;
  author: User;
  content: {
    text: string;
    image: {
      url: string;
      publicId: string;
    } | null;
  };
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  likedByAuthenticatedUser: boolean;
}

export interface Comment {
  _id: string;
  author: User;
  postId: string;
  content: string;
  likedBy: User[];
  likedByAuthenticatedUser: boolean;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
}
