"use client";

import { FieldGroup } from "@/shared/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField } from "@/shared/components/shared/password-field/PasswordField";
import { InputField } from "@/shared/components/shared/InputField";
import { loginSchema } from "@/features/auth/types/schema";
import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import { useLoginMutation } from "../../hooks/useLogin";
import { Loader2 } from "lucide-react";
import { LoginData } from "../../types";

export const LoginForm = () => {
  const { control, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useLoginMutation();

  const onSubmit = async (registerData: LoginData) => {
    loginMutation.mutate(registerData);
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
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
};
