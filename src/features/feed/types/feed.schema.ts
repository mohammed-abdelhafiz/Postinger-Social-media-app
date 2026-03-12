import * as z from "zod";

export const createPostSchema = z.object({
  content: z.object({
    text: z.string().min(1, "Post content is required"),
    image: z.file().nullable(),
  }),
});

export type CreatePostFormData = z.infer<typeof createPostSchema>;
