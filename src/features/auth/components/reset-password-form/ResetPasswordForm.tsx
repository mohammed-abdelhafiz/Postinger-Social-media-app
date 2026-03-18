"use client";

import { FieldGroup } from "@/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateNewPasswordData,
  createNewPasswordSchema,
} from "@/features/auth/types/auth.schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { PasswordField } from "@/components/shared/password-field/PasswordField";
import { useCreateNewPasswordMutation } from "../../hooks/useResetPassword";
import { useParams } from "next/navigation";

export const ResetPasswordForm = () => {
  const token  = useParams().token as string;
  const { handleSubmit, control } = useForm<CreateNewPasswordData>({
    resolver: zodResolver(createNewPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });
  const { mutate: createNewPassword, isPending } =
    useCreateNewPasswordMutation();

  const onSubmit = (data: CreateNewPasswordData) => {
    createNewPassword({ newPassword: data.newPassword, token });
  };

  return (
    <form
      id="create-new-password-form"
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
        form="create-new-password-form"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          "Create New Password"
        )}
      </Button>
    </form>
  );
};
