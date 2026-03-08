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
import { useRegisterMutation } from "../../hooks/useRegisterMutation";

export const RegisterForm = () => {
  const { control, handleSubmit } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = async (registerData: RegisterData) => {
    registerMutation.mutate(registerData);
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
