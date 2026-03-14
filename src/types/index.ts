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
  avatar: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}
