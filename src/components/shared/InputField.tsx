import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HelpCircleIcon } from "lucide-react";

interface InputFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder: string;
}

export const InputField = <T extends FieldValues>({
  field,
  fieldState,
  label,
  placeholder,
}: InputFieldProps<T>) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
        {fieldState.error && (
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <HelpCircleIcon className="text-destructive size-3.5" />
            </TooltipTrigger>
            <TooltipContent>{fieldState.error.message}</TooltipContent>
          </Tooltip>
        )}
      </div>
      <Input
        {...field}
        id={field.name}
        placeholder={placeholder}
        aria-invalid={fieldState.invalid}
      />
    </Field>
  );
};
