"use client";

import { Dot } from "lucide-react";
import { cn, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCardActions } from "./PostCardActions";
import { Post } from "../../types/feed.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  return (
    <Card className="w-full bg-linear-to-br from-background/5 to-background/2
     border border-foreground/10
     shadow-sm
    ">
      <CardHeader className="flex gap-3">
        <Avatar className="shrink-0">
          <AvatarImage
            src={post.author.avatar}
            alt={post.author.username}
          />
          <AvatarFallback>
            {post.author.username?.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex items-start justify-between flex-1">
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="cursor-pointer font-semibold hover:underline">
                {post.author.name}
              </span>
              <Dot className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">
                {timeAgo(post.createdAt)}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              @{post.author.username}
            </span>
          </div>
          <PostCardActions />
        </div>
      </CardHeader>
      <CardContent
        className="flex flex-col gap-2 pl-14"
      >
        <p className="text-sm">{post.content.text}</p>

        {post.content.image && (
          <Image
            src={post.content.image.url}
            alt="Post image"
            className="rounded"
            width={450}
            height={350}
          />
        )}
      </CardContent>
    </Card>
  );
}
