"use client";

import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { useNotifications, useMarkAllAsRead, useUnreadCount } from "@/features/notifications/hooks";
import { NotificationType } from "@/features/notifications/types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

export function Notifications() {
  const { data: notifications, isLoading } = useNotifications();
  const { data: unreadCount = 0 } = useUnreadCount();
  const markAllAsRead = useMarkAllAsRead();
  const router = useRouter();

  const getActionText = (type: NotificationType) => {
    switch (type) {
      case NotificationType.LIKE:
        return "liked your post";
      case NotificationType.COMMENT:
        return "commented on your post";
      case NotificationType.FOLLOW:
        return "started following you";
      default:
        return "interacted with you";
    }
  };

  return (
    <div className="flex items-center justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" size="icon" className="relative">
              <BellIcon aria-hidden="true" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1.5 -right-2 rounded-full px-1 min-w-[1.2rem] h-[1.2rem] flex items-center justify-center text-[10px]"
                  aria-hidden="true"
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </Badge>
              )}
            </Button>
          }
        />
        <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              {unreadCount > 0 && (
                <button 
                  onClick={() => markAllAsRead.mutate()}
                  className="text-foreground text-xs font-normal underline-offset-2 hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-sm text-muted-foreground">Loading...</div>
              ) : !notifications || notifications.length === 0 ? (
                <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
              ) : (
                notifications.slice(0, 5).map((notification: any) => (
                  <DropdownMenuItem
                    key={notification._id}
                    className="flex items-start gap-3 py-3 cursor-pointer"
                    onClick={() => {
                      if (notification.post) router.push(`/posts/${notification.post._id}`);
                      else if (notification.type === NotificationType.FOLLOW) router.push(`/profile/${notification.sender.username}`);
                    }}
                  >
                    <Avatar className="mt-0.5 size-8 shrink-0 border border-border">
                      <AvatarImage
                        src={notification.sender.profileImage?.url}
                        alt={notification.sender.username}
                      />
                      <AvatarFallback>{notification.sender.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-1 flex-col gap-px min-w-0">
                      <p className="text-sm leading-snug">
                        <span className="font-bold">{notification.sender.username}</span>{" "}
                        <span className="text-muted-foreground">
                          {getActionText(notification.type)}
                        </span>
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        {dayjs(notification.createdAt).fromNow()}
                      </span>
                    </div>
                    {!notification.isRead && (
                      <span className="bg-primary mt-2 size-1.5 shrink-0 rounded-full" />
                    )}
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href="/notifications">
              <DropdownMenuItem className="justify-center text-primary font-medium cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
