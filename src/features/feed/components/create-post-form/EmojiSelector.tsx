"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmileIcon } from "lucide-react";

interface EmojiSelectorProps {
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export default function EmojiSelector({ setText }: EmojiSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover onOpenChange={setIsOpen} open={isOpen}>
      <PopoverTrigger
        render={
          <Button variant="ghost" className="cursor-pointer" size="icon-sm">
            <SmileIcon />
          </Button>
        }
      />
      <PopoverContent className="w-fit p-0">
        <EmojiPicker
          className="h-[342px]"
          onEmojiSelect={({ emoji }) => {
            setText((prev) => prev + emoji);
          }}
        >
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
