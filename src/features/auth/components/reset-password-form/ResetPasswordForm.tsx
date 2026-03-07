"use client";

import { FieldGroup } from "@/components/ui/field";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/shared/InputField";
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from "@/features/auth/types/auth.schema";

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ResetPasswordSchema) => {
    toast.success("Password reset email sent!");
    console.log(data);
  };

  return (
    <form id="reset-password-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <InputField
          control={form.control}
          name="email"
          label="Email"
          placeholder="john.doe@example.com"
        />
      </FieldGroup>
    </form>
  );
};
