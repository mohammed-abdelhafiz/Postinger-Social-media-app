import { User } from "@/types";

export interface Post {
  _id: string;
  author: User;
  content: {
    image?: {
      url: string;
      publicId: string;
    };
    text?: string;
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
