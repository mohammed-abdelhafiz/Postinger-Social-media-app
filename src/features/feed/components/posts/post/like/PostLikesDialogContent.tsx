import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { usePostContext } from "@/features/feed/contexts/PostContext";
import { LikesList } from "./LikesList";
import { getPostLikes } from "@/features/feed/services/feedApi";

export const PostLikesDialogContent = () => {
  const { post } = usePostContext();
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Likes</DialogTitle>
        <DialogDescription>
          {post?.likesCount} likes
        </DialogDescription>
      </DialogHeader>
      <LikesList
        queryKey={["post-likes", post._id]}
        queryFn={getPostLikes}
        extraParams={{ postId: post._id }}
        item="post"
      />
    </>
  );
};
