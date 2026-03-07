"use client";

import { FieldGroup } from "@/components/ui/field";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField } from "@/components/shared/password-field/PasswordField";
import { InputField } from "@/components/shared/InputField";
import { loginSchema, LoginSchema } from "@/features/auth/types/auth.schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    toast.success("Login successful!");
    console.log(data);
  };

  return (
    <form
      id="login-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup className="gap-5">
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
        <Link
          href="/reset-password"
          className="ml-1 hover:underline text-muted-foreground text-sm"
        >
          Forgot your password?
        </Link>
      </FieldGroup>
      <Button
        type="submit"
        form="login-form"
        className="w-full cursor-pointer"
      >
        Login
      </Button>
    </form>
  );
};
