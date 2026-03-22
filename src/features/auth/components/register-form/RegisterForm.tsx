"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterData,
} from "@/features/auth/types/auth.schema";

import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/shared/InputField";
import { PasswordField } from "@/components/shared/password-field/PasswordField";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRegisterMutation } from "../../hooks/useRegister";
import { TextareaField } from "@/components/shared/TextareaField";
import { AvatarInput } from "@/components/shared/avatar-input/AvatarInput";
import { useState } from "react";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      bio: "",
    },
  });

  const [uploadedAvatar, setUploadedAvatar] = useState<File | null>(null);

  const registerMutation = useRegisterMutation();

  const onSubmit = async (registerData: RegisterData) => {
    const formData = new FormData();
    formData.append("name", registerData.name);
    formData.append("username", registerData.username);
    formData.append("email", registerData.email);
    formData.append("password", registerData.password);
    if (registerData.bio) {
      formData.append("bio", registerData.bio);
    }
    if (uploadedAvatar) {
      formData.append("avatar", uploadedAvatar);
    }
    registerMutation.mutate(formData);
  };

  return (
    <form
      id="register-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup className="gap-5">
        <div className="flex items-center gap-3">
          <InputField
            control={control}
            name="name"
            label="Name"
            placeholder="John Doe"
          />

          <InputField
            control={control}
            name="username"
            label="Username"
            placeholder="john_doe"
          />
        </div>
        <AvatarInput setUploadedAvatar={setUploadedAvatar} />
        <TextareaField
          control={control}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself"
        />
        <InputField
          control={control}
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
        />

        <PasswordField
          control={control}
          name="password"
          label="Password"
          placeholder="••••••••"
        />
      </FieldGroup>
      <Button
        type="submit"
        form="register-form"
        className="w-full cursor-pointer"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Register"
        )}
      </Button>
    </form>
  );
};
