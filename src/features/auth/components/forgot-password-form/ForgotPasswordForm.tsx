"use client";

import { FieldGroup } from "@/shared/components/ui/field";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { InputField } from "@/shared/components/shared/InputField";
import { forgotPasswordSchema } from "@/features/auth/types/schema";
import { useForgotPasswordMutation } from "../../hooks/useForgotPassword";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import { ForgotPasswordData } from "../../types";

export const ForgotPasswordForm = () => {
  const { handleSubmit, control } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: forgotPassword, isPending } = useForgotPasswordMutation();

  const onSubmit = (data: ForgotPasswordData) => {
    forgotPassword(data);
  };

  return (
    <form
      id="forgot-password-form"
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
        form="forgot-password-form"
        className="w-full cursor-pointer"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
      </Button>
    </form>
  );
};
