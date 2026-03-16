import { User } from "@/types";

export interface Post {
  _id: string;
  author: User;
  content: {
    image: {
      url: string;
      publicId: string;
    } | null;
    text: string;
  };
  comments: Comment[];
  likes: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  postId: string;
    author: User;
    content: string;
    likes: User[];
    createdAt: string;
    updatedAt: string;

}

export interface UploadedImage {
  file: File;
  preview: string;
}
