import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { usePostContext } from "@/features/posts/context/PostContext";
import { PostLikesList } from "./PostLikesList";

export const PostLikesDialogContent = () => {
  const { post } = usePostContext();

  return (
    <>
      <DialogHeader>
        <DialogTitle>Likes</DialogTitle>
        <DialogDescription>{post.likesCount} likes</DialogDescription>
      </DialogHeader>
      <PostLikesList />
    </>
  );
};
