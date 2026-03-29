import { HTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

export const Logo = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(`text-lg font-extrabold text-primary
    cursor-pointer hover:text-primary/80 transition-colors
    italic tracking-tight`, props.className)}
      {...props}
    >
      Postinger
    </div>
  );
};
