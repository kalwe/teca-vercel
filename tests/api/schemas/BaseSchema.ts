import { z } from "zod"

export const ResponseSchema = z.object({
    version: z.number().optional(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime().optional(),
    // is_active: z.boolean(),
})

export const DeletedResponseSchema = z.object({
    id: z.number(),
    version: z.number().optional(),
    deleted_at: z.string().datetime().optional(),
    is_active: z.boolean(),
})

export type DeletedResponse = z.infer<typeof DeletedResponseSchema>
