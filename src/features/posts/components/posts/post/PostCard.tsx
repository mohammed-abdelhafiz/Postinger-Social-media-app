"use client";

import { Dot } from "lucide-react";
import { timeAgo } from "@/shared/lib/helperFuns";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { PostCardActions } from "./PostCardActions";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { LikeButton } from "../../LikeButton";
import { CommentButton } from "../../../../comments/components/CommentButton";
import { useAuthStore } from "@/shared/store/auth.store";
import { usePostContext } from "@/features/posts/context/PostContext";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";
import { LikesDialog } from "./like/LikesDialog";
import { useLikePost } from "@/features/posts/hooks/useLikePost";
import { useUnlikePost } from "@/features/posts/hooks/useUnlikePost";
import Link from "next/link";

interface PostCardProps {
  priority?: boolean;
}

export default function PostCard({ priority = false }: PostCardProps) {
  const user = useAuthStore((s) => s.user);
  const { post } = usePostContext();
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();
  const handleLike = () => {
    likePostMutation.mutate(post._id);
  };
  const handleUnlike = () => {
    unlikePostMutation.mutate(post._id);
  };
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);
  const [isPostLikesDialogOpen, setIsPostLikesDialogOpen] = useState(false);
  return (
    <Card
      className="w-full bg-linear-to-br from-background/5 to-background/2
     border border-foreground/10
     shadow-sm
    "
    >
      <CardHeader className="flex gap-3">
        <Link href={`/profile/${post.author.username}`}>
          <Avatar className="shrink-0">
            <AvatarImage
              src={post.author.avatar?.url}
              alt={post.author.username}
            />
            <AvatarFallback>{post.author.username?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>

        <div className="flex items-start justify-between flex-1">
          <div className="flex flex-col">
            <div className="flex items-center">
              <Link href={`/profile/${post.author.username}`}>
                <span className="cursor-pointer font-semibold hover:underline">
                  {post.author.name}
                </span>
              </Link>
              <Dot className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {timeAgo(post.createdAt)}
              </span>
            </div>
            <Link href={`/profile/${post.author.username}`}>
              <span className="text-xs text-muted-foreground">
                @{post.author.username}
              </span>
            </Link>
          </div>
          {post.author._id === user?._id && <PostCardActions />}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 pl-14">
        <p className="text-sm">{post.content.text}</p>
        {post.content.image && (
          <Image
            src={post.content.image.url}
            alt={`Image shared by ${post.author.name}`}
            className="rounded w-full"
            width={450}
            height={350}
            style={{ height: "auto" }}
            priority={priority}
          />
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between pr-0.5">
        <div className="flex items-center">
          <LikeButton
            isLiked={post.isLiked}
            handleLike={handleLike}
            handleUnlike={handleUnlike}
            disabled={likePostMutation.isPending || unlikePostMutation.isPending}
          />
          <CommentButton
            isCommentsDialogOpen={isCommentsDialogOpen}
            setIsCommentsDialogOpen={setIsCommentsDialogOpen}
          />
        </div>
        <div className="flex items-center">
          <Button
            variant="link"
            size="xs"
            className="text-sm text-muted-foreground"
            onClick={() => setIsPostLikesDialogOpen(true)}
          >
            {post.likesCount} {post.likesCount === 1 ? "like" : "likes"}
          </Button>
          <LikesDialog
            isOpen={isPostLikesDialogOpen}
            setIsOpen={setIsPostLikesDialogOpen}
            item="post"
          />
          <Button
            variant="link"
            size="xs"
            className="text-sm text-muted-foreground"
            onClick={() => setIsCommentsDialogOpen(true)}
          >
            {post.commentsCount}{" "}
            {post.commentsCount === 1 ? "comment" : "comments"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
