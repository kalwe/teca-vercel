import { z } from "zod"

import { ResponseSchema } from "./BaseSchema"

export const UserSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(4),
    email: z.string().email().trim(),
    password: z.string().min(6),
    is_active: z.boolean().optional(),
})

export const UserResponseSchema = UserSchema.merge(ResponseSchema)

export type UserInput = z.infer<typeof UserSchema>
export type UserResponse = z.infer<typeof UserResponseSchema>
