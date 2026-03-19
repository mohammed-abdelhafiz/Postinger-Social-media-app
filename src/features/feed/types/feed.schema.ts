import { z } from "zod";

export const editPostFormSchema = z.object({
  text: z.string().trim(),
  newImageFile: z.instanceof(File).nullable(),
});

export type EditPostFormValues = z.infer<typeof editPostFormSchema>;
