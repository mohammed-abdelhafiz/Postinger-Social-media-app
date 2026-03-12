export type Theme = "light" | "dark" | "system";

export interface NavItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
}
