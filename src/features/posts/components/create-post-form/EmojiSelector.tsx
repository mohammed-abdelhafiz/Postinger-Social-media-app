"use client";

import * as React from "react";

import { Button } from "@/shared/components/ui/button";
import {
  EmojiPicker,
  EmojiPickerSearch,
  EmojiPickerContent,
  EmojiPickerFooter,
} from "@/shared/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { SmileIcon } from "lucide-react";

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: { emoji: string; label: string }) => void;
}

export default function EmojiSelector({ onEmojiSelect }: EmojiSelectorProps) {
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
        <EmojiPicker className="h-[342px]" onEmojiSelect={onEmojiSelect}>
          <EmojiPickerSearch />
          <EmojiPickerContent />
          <EmojiPickerFooter />
        </EmojiPicker>
      </PopoverContent>
    </Popover>
  );
}
