"use client";

import { Dot } from "lucide-react";
import { cn, timeAgo } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCardActions } from "./PostCardActions";
import { Post } from "../../types/feed.types";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link
      prefetch={false}
      href={`post/${post._id}`}
      className="m-auto h-fit w-full"
    >
      <div
        className={cn(
          "relative isolate my-auto w-full  overflow-hidden",
          "bg-white/5 dark:bg-black/90",
          "bg-linear-to-br from-black/5 to-black/2 dark:from-white/5 dark:to-white/2",
          "backdrop-blur-xl backdrop-saturate-180",
          "border border-black/10 dark:border-white/10",
          "shadow-[0_8px_16px_rgb(0_0_0/0.15)] dark:shadow-[0_8px_16px_rgb(0_0_0/0.25)]",
          "translate-z-0 will-change-transform",
        )}
      >
        <div
          className={cn(
            "relative w-full p-5",
            "bg-linear-to-br from-black/5 to-transparent dark:from-white/8 dark:to-transparent",
            "backdrop-blur-md backdrop-saturate-150",
            "border border-black/5 dark:border-white/8",
            "text-black/90 dark:text-white",
            "shadow-xs",
            "translate-z-0 will-change-transform",
            "before:pointer-events-none before:absolute before:inset-0 before:bg-linear-to-br before:from-black/2 before:to-black/1 before:opacity-0 before:transition-opacity dark:before:from-white/3 dark:before:to-white/1",
            "hover:before:opacity-100",
          )}
        >
          <div className="flex gap-3">
            <div className="shrink-0">
              <Avatar>
                <AvatarImage
                  src={"https://github.com/shadcn.png"}
                  alt={"post.authorName"}
                />
                <AvatarFallback>{"post.authorName.charAt(0)"}</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <span className="cursor-pointer font-semibold hover:underline">
                      {"Mohamed Ali"}
                    </span>
                    <Dot className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">
                      {timeAgo(post.createdAt)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    @{"moali22"}
                  </span>
                </div>
                <PostCardActions />
              </div>
            </div>
          </div>
          <p className="m-2 text-sm">{post.content.text}</p>

          {post.content.image && (
            <div className="flex justify-center mt-4 overflow-hidden">
              <Image
                src={post.content.image}
                alt="Post image"
                width={380}
                height={250}
                className="rounded"
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
