"use client";

import { FieldGroup } from "@/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/components/shared/InputField";
import {
  resetPasswordSchema,
  ResetPasswordData,
} from "@/features/auth/types/auth.schema";
import { useRequestResetPasswordMutation } from "../../hooks/useRequestResetPassword";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const RequestResetPasswordForm = () => {
  const { handleSubmit, control } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: requestResetPassword, isPending } =
    useRequestResetPasswordMutation();

  const onSubmit = (data: ResetPasswordData) => {
    requestResetPassword(data);
  };

  return (
    <form
      id="reset-password-form"
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
      </FieldGroup>
      <Button
        type="submit"
        form="reset-password-form"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Reset Password"}
      </Button>
    </form>
  );
};
