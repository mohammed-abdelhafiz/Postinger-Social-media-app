"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Notification, NotificationType } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, UserPlus, MoreHorizontal, Check, Trash2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";

dayjs.extend(relativeTime);

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onDelete }: NotificationItemProps) {
  const router = useRouter();

  const getIcon = () => {
    switch (notification.type) {
      case NotificationType.LIKE:
        return <Heart className="size-4 fill-red-500 text-red-500" />;
      case NotificationType.COMMENT:
        return <MessageCircle className="size-4 text-blue-500" />;
      case NotificationType.FOLLOW:
        return <UserPlus className="size-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getActionText = () => {
    switch (notification.type) {
      case NotificationType.LIKE:
        return "liked your post";
      case NotificationType.COMMENT:
        return "commented on your post";
      case NotificationType.FOLLOW:
        return "started following you";
      default:
        return "";
    }
  };

  const getLink = () => {
    if (notification.post) {
      return `/posts/${notification.post._id}`;
    }
    if (notification.type === NotificationType.FOLLOW) {
      return `/profile/${notification.sender.username}`;
    }
    return "#";
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only handle left clicks
    if (e.button !== 0) return;
    
    // Ignore if clicked on an actual link or button (or inside one)
    if ((e.target as HTMLElement).closest('a, button, [role="menuitem"]')) {
      return;
    }

    if (!notification.isRead) {
      onMarkAsRead(notification._id);
    }
    router.push(getLink());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group relative flex items-start gap-4 p-4 transition-all hover:bg-muted/50 rounded-xl cursor-pointer",
        !notification.isRead && "bg-primary/5"
      )}
      onClick={handleCardClick}
    >

      <Link href={`/profile/${notification.sender.username}`} className="relative z-10 shrink-0">
        <div className="relative">
          <Avatar className="size-12 border-2 border-background">
            <AvatarImage src={notification.sender.profileImage?.url} />
            <AvatarFallback>{notification.sender.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1 shadow-sm">
            {getIcon()}
          </div>
        </div>
      </Link>

      <div className="relative z-10 flex flex-1 flex-col gap-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm leading-relaxed min-w-0">
            <Link href={`/profile/${notification.sender.username}`} className="font-bold hover:underline">
              {notification.sender.username}
            </Link>{" "}
            <span className="text-muted-foreground">{getActionText()}</span>
          </p>
          {!notification.isRead && (
            <div className="size-2 shrink-0 rounded-full bg-primary" />
          )}
        </div>

        {notification.post?.content.text && (
          <p className="text-sm text-muted-foreground line-clamp-1 italic">
            &ldquo;{notification.post.content.text}&rdquo;
          </p>
        )}

        <Link href={getLink()} onClick={(e) => e.stopPropagation()} className="text-xs text-muted-foreground w-fit hover:underline">
          {dayjs(notification.createdAt).fromNow()}
        </Link>
      </div>

      <div className="relative z-10 flex shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-full text-muted-foreground cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal className="size-5" />
              </Button>
            }
          />
          <DropdownMenuContent align="end" sideOffset={4}>
            {!notification.isRead && (
              <DropdownMenuItem
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAsRead(notification._id);
                }}
              >
                <Check className="size-4" />
                Mark as read
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(notification._id);
              }}
            >
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  );
}
