import * as z from "zod";
import {
  loginSchema,
  registerSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "./schema";

export type RegisterData = z.infer<typeof registerSchema>;

export type LoginData = z.infer<typeof loginSchema>;

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
