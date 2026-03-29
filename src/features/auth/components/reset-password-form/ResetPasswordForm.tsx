"use client";

import { FieldGroup } from "@/shared/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { resetPasswordSchema } from "@/features/auth/types/schema";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { PasswordField } from "@/shared/components/shared/password-field/PasswordField";
import { useResetPasswordMutation } from "../../hooks/useResetPassword";
import { useParams } from "next/navigation";
import { ResetPasswordData } from "../../types";

export const ResetPasswordForm = () => {
  const token = useParams().token as string;
  const { handleSubmit, control } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      token,
    },
  });
  const { mutate: resetPassword, isPending } = useResetPasswordMutation();

  const onSubmit = (data: ResetPasswordData) => {
    resetPassword(data);
  };

  return (
    <form
      id="reset-password-form"
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <FieldGroup className="gap-5">
        <PasswordField
          control={control}
          name="newPassword"
          label="New Password"
          placeholder="********"
        />
      </FieldGroup>
      <Button
        type="submit"
        form="reset-password-form"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Reset Password"
        )}
      </Button>
    </form>
  );
};
