"use client";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchema,
} from "@/features/auth/types/auth.schema";

import { FieldGroup } from "@/components/ui/field";
import { InputField } from "@/components/shared/InputField";
import { PasswordField } from "@/components/shared/password-field/PasswordField";
import { Button } from "@/components/ui/button";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    toast.success("Account created successfully!");
    console.log(data);
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
      >
        Register
      </Button>
    </form>
  );
};
