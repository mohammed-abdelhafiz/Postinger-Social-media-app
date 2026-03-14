import { User } from "@/types";

export interface Post {
  _id: string;
  author: User;
  content: {
    imageUrl?: string;
    text?: string;
    _id: string;
  };
  comments: [];
  likes: [];
  createdAt: string;
  updatedAt: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
}
