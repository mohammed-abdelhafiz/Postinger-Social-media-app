export type ProfileTab = "posted" | "liked";

interface Image {
    url: string;
    public_id: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: Image;
  coverImage: Image;
  bio: string;
  createdAt: string;
  updatedAt: string;
  isFollowing: boolean;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface GetUserPostsParams {
  pageParam: number;
  activeTab: ProfileTab;
  username: string;
}
