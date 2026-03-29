import * as z from "zod";

export const createPostSchema = z.object({
  text: z.string().trim().optional(),
  image: z.instanceof(File).optional(),
});

export const editPostSchema = z.object({
  postId: z.string(),
  text: z.string().optional(),
  image: z.instanceof(File).optional(),
  removeOldImage: z.boolean().optional(),
});
