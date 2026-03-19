import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

interface AvatarInputProps {
  label?: string;
  className?: string;
  setUploadedAvatar: (avatar: File | null) => void;
}

export const AvatarInput = ({
  label = "Profile Picture",
  className,
  setUploadedAvatar,
}: AvatarInputProps) => {
  return (
    <Field className={className}>
      <FieldLabel htmlFor="avatar">{label}</FieldLabel>
      <Input
        type="file"
        accept="image/*"
        id="avatar"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setUploadedAvatar(file);
          }
        }}
      />
    </Field>
  );
};
