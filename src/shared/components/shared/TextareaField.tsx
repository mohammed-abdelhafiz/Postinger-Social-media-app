import { Field, FieldLabel } from "../ui/field";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HelpCircleIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface TextareaFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
}

export const TextareaField = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
}: TextareaFieldProps<T>) => {
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
                <TooltipContent>{fieldState.error.message}</TooltipContent>
              </Tooltip>
            )}
          </div>
          <Textarea
            {...field}
            id={field.name}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder}
            className="resize-none"
            maxLength={160}
          />
        </Field>
      )}
    />
  );
};
