"use client";

import { FieldGroup } from "@/components/ui/field";

import { toast } from "sonner";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerSchema,
  RegisterSchema,
} from "@/features/auth/types/auth.schema";
import { PasswordField } from "@/components/shared/PasswordField";
import { InputField } from "@/components/shared/InputField";

export const RegisterForm = () => {
  const form = useForm<RegisterSchema>({
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
    <form id="register-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5">
        <div className="flex items-center gap-3">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Name"
                placeholder="John Doe"
              />
            )}
          />
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Username"
                placeholder="john_doe"
              />
            )}
          />
        </div>
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
      </FieldGroup>
    </form>
  );
};
