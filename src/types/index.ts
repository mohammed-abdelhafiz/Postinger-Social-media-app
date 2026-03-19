export type Theme = "light" | "dark" | "system";

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  avatar: {
    url: string;
    public_id: string;
  };
  bio: string;
  createdAt: string;
  updatedAt: string;
}
