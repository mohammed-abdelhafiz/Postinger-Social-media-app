import { User } from "@/types";

export interface Post {
  _id: string;
  author: User;
  content: {
    text: string;
    image: {
      url: string;
      publicId: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  commentsCount: number;
  likedByCurrentUser: boolean;
}

export interface Comment {
  _id: string;
  author: User;
  postId: string;
  content: string;
  likedBy: User[];
  likedByCurrentUser: boolean;
  likesCount: number;
  createdAt: string;
  updatedAt: string;
}


export interface UploadedImage {
  file: File;
  preview: string;
}
