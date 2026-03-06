"use client";

import { useMemo, useState } from "react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  CheckIcon,
  EyeIcon,
  EyeOffIcon,
  HelpCircleIcon,
  XIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  useWatch,
} from "react-hook-form";

interface PasswordFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  control: Control<T>;
}

const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[0-9]/, text: "At least 1 number" },
  { regex: /[a-z]/, text: "At least 1 lowercase letter" },
  { regex: /[A-Z]/, text: "At least 1 uppercase letter" },
  { regex: /[!@#$%^&*(),.?":{}|<>]/, text: "At least 1 special character" },
];

export function PasswordField<T extends FieldValues>({
  field,
  fieldState,
  control,
}: PasswordFieldProps<T>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const password =
    useWatch({
      control,
      name: field.name,
    }) ?? "";
  const toggleVisibility = () => setIsVisible((v) => !v);
  const checkStrength = (pass: string): { met: boolean; text: string }[] => {
    return PASSWORD_REQUIREMENTS.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = useMemo(() => checkStrength(password), [password]);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score <= 3) return "bg-amber-500";
    if (score <= 4) return "bg-green-500";
    return "bg-green-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Enter a password";
    if (score <= 2) return "Weak security";
    if (score <= 4) return "Medium security";
    return "Strong security";
  };

  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor="password">Password</FieldLabel>
        {fieldState.error && (
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <HelpCircleIcon className="text-destructive size-3.5" />
            </TooltipTrigger>
            <TooltipContent
              align="end"
              sideOffset={5}
              className="w-72 space-y-4 pt-4"
            >
              <div
                aria-label="Password strength"
                aria-valuemax={5}
                aria-valuemin={0}
                aria-valuenow={strengthScore}
                className="flex gap-1"
                role="progressbar"
              >
                {strength.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                      i < strengthScore
                        ? getStrengthColor(strengthScore)
                        : "bg-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-muted">
                <p className="text-sm" id="password-description">
                  {getStrengthText(strengthScore)}
                </p>
                <span className="text-xs">
                  {strengthScore}/{strength.length} requirements met
                </span>
              </div>

              <ul aria-label="Password requirements" className="space-y-1.5">
                {strength.map((req) => (
                  <li className="flex items-center gap-1" key={req.text}>
                    {req.met ? (
                      <CheckIcon
                        className="size-3.5 text-green-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        className="text-muted-foreground size-3.5"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`text-xs transition-colors ${req.met ? "text-green-700" : "text-muted-foreground"}`}
                    >
                      {req.text}
                      <span className="sr-only">
                        {req.met
                          ? " - Requirement met"
                          : " - Requirement not met"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
      <div className="relative">
        <Input
          {...field}
          aria-describedby="password-description"
          aria-invalid={fieldState.invalid}
          className="pe-9"
          id="password"
          placeholder="********"
          type={isVisible ? "text" : "password"}
        />
        <button
          aria-controls="password"
          aria-label={isVisible ? "Hide password" : "Show password"}
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
  );
}
