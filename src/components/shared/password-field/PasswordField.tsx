"use client";

import { useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon, HelpCircleIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../ui/tooltip";

import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { PasswordReqs } from "./PasswordReqs";
import { cn } from "@/lib/utils";

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}

export function PasswordField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: PasswordFieldProps<T>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((v) => !v);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <div className="flex items-center gap-2">
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {fieldState.error && (
              <Tooltip>
                <TooltipTrigger className="inline-flex items-center">
                  <HelpCircleIcon className="text-destructive size-3.5" />
                </TooltipTrigger>
                <TooltipContent
                  align="end"
                  sideOffset={5}
                  className={cn(name === "password" && "w-72 space-y-4 pt-4")}
                >
                  {name === "password" ? (
                    <PasswordReqs value={field.value} />
                  ) : (
                    fieldState.error.message
                  )}
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          <div className="relative">
            <Input
              {...field}
              aria-describedby={`${name}-description`}
              aria-invalid={fieldState.invalid}
              className="pe-9"
              id={field.name}
              placeholder={placeholder}
              type={isVisible ? "text" : "password"}
            />
            <button
              aria-controls={name}
              aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
              aria-pressed={isVisible}
              className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 inset-e-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
              onClick={toggleVisibility}
              type="button"
            >
              {isVisible ? (
                <EyeOffIcon className="size-3.5" aria-hidden="true" />
              ) : (
                <EyeIcon className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </Field>
      )}
    />
  );
}
