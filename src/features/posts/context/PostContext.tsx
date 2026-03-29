"use client";

import { createContext, useContext, ReactNode } from "react";
import { Post } from "../types";

interface PostContextType {
  post: Post;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({
  post,
  children,
}: {
  post: Post;
  children: ReactNode;
}) => {
  return (
    <PostContext.Provider value={{ post }}>{children}</PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
