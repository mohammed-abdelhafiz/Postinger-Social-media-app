"use client";

import { PlusIcon } from "lucide-react";
import { HTMLAttributes } from "react";

interface FloatingActionButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export default function FloatingActionButton({
  onClick,
  ...props
}: FloatingActionButtonProps) {
  return (
    <button
      className="rounded-full w-12 h-12 font-extrabold bg-primary flex items-center justify-center text-primary-foreground cursor-pointer hover:bg-primary/90 fixed bottom-4 right-4 z-50"
      onClick={onClick}
      {...props}
    >
      <PlusIcon />
    </button>
  );
}
