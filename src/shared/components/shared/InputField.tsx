import { Field, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HelpCircleIcon } from "lucide-react";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  className?: string;
}

export const InputField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
}: InputFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className={className}>
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
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
          />
        </Field>
      )}
    />
  );
};
