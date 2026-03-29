"use client";

import { createContext, useContext, ReactNode } from "react";
import { Comment } from "../types";

interface CommentContextType {
  comment: Comment;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider = ({
  comment,
  children,
}: {
  comment: Comment;
  children: ReactNode;
}) => {
  return (
    <CommentContext.Provider value={{ comment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};
