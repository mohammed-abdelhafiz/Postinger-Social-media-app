"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";
import { User } from "../../types";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile";
import { useState, useRef } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";

const editProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(30),
  bio: z.string().max(160, "Bio must be at most 160 characters").optional(),
});

type EditProfileValues = z.infer<typeof editProfileSchema>;

interface EditProfileModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProfileModal = ({
  user,
  isOpen,
  onClose,
}: EditProfileModalProps) => {
  const updateProfileMutation = useUpdateUserProfile();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileValues>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name,
      bio: user.bio || "",
    },
  });

  const bioValue = watch("bio") || "";

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: EditProfileValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (values.bio) formData.append("bio", values.bio);
    
    if (avatarInputRef.current?.files?.[0]) {
      formData.append("avatar", avatarInputRef.current.files[0]);
    }
    
    if (coverInputRef.current?.files?.[0]) {
      formData.append("coverImage", coverInputRef.current.files[0]);
    }

    updateProfileMutation.mutate(
      { userId: user._id, formData },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                    <X className="w-5 h-5" />
                </Button>
                <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
            </div>
          <Button 
            onClick={handleSubmit(onSubmit)} 
            disabled={updateProfileMutation.isPending}
            className="rounded-full px-6 font-semibold"
          >
            {updateProfileMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto hide-scrollbar">
          {/* Cover Image */}
          <div className="relative h-48 w-full bg-muted">
            <Image
              src={coverPreview || user.coverImage?.url || "https://images.unsplash.com/photo-1660491630578-4299a3c09db0?q=80&w=880&auto=format&fit=crop"}
              alt="cover"
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-background/50 hover:bg-background/70 backdrop-blur-sm"
                onClick={() => coverInputRef.current?.click()}
              >
                <Camera className="w-6 h-6" />
              </Button>
            </div>
            <input
              type="file"
              ref={coverInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleCoverChange}
            />
          </div>

          <div className="px-6 pb-6 relative">
            {/* Avatar */}
            <div className="relative w-32 h-32 -mt-16 rounded-full border-4 border-background overflow-hidden bg-muted shadow-lg">
              <Image
                src={avatarPreview || user.avatar?.url || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"}
                alt="avatar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-transparent"
                  onClick={() => avatarInputRef.current?.click()}
                >
                  <Camera className="w-8 h-8" />
                </Button>
              </div>
              <input
                type="file"
                ref={avatarInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>

            <form className="mt-8 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-muted-foreground ml-1">Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="rounded-xl h-12 border-muted hover:border-primary/50 transition-colors bg-secondary/5"
                  placeholder="Your Name"
                />
                {errors.name && (
                  <p className="text-xs text-destructive mt-1 ml-1">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium text-muted-foreground ml-1">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  rows={4}
                  className="rounded-xl border-muted hover:border-primary/50 transition-colors bg-secondary/5 resize-none"
                  placeholder="Tell us about yourself..."
                />
                <div className="flex justify-end">
                    <p className="text-[10px] text-muted-foreground mt-1">
                        {bioValue.length}/160
                    </p>
                </div>
                {errors.bio && (
                  <p className="text-xs text-destructive mt-1 ml-1">{errors.bio.message}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
