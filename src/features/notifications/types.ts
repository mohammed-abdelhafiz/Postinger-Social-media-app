export enum NotificationType {
  LIKE = "like",
  COMMENT = "comment",
  FOLLOW = "follow",
}

export interface Notification {
  _id: string;
  recipient: string;
  sender: {
    _id: string;
    username: string;
    profileImage?: { url: string };
  };
  type: NotificationType;
  post?: {
    _id: string;
    content: {
      text?: string;
      image?: { url: string };
    };
  };
  comment?: string;
  isRead: boolean;
  createdAt: string;
}
