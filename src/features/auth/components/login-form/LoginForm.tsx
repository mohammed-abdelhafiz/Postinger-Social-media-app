"use client";

import { FieldGroup } from "@/components/ui/field";

import { toast } from "sonner";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { PasswordField } from "@/components/shared/PasswordField";
import { InputField } from "@/components/shared/InputField";
import { loginSchema, LoginSchema } from "@/features/auth/types/auth.schema";
import Link from "next/link";

export const LoginForm = () => {
  const form = useForm<LoginSchema>({
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
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputField
              field={field}
              fieldState={fieldState}
              label="Email"
              placeholder="john.doe@example.com"
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordField
              field={field}
              fieldState={fieldState}
              control={form.control}
            />
          )}
        />
        <Link
          href="/reset-password"
          className="ml-1 hover:underline text-muted-foreground text-sm"
        >
          Forgot your password?
        </Link>
      </FieldGroup>
    </form>
  );
};
