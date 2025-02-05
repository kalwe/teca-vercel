import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type LoginData = z.infer<typeof loginSchema>;

export const authResponseSchema = z.object({
  token: z.string(),
  username: z.string(),
});

export type AuthResponse = z.infer<typeof authResponseSchema>;

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string().email("E-mail inválido."),
  role: z.enum(["admin", "user", "manager"]),
});

export type User = z.infer<typeof userSchema>;
