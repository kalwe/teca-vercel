import { z } from "zod"

import { AddressSchema } from "./AddressSchema"
import { BankAccountSchema } from "./BankAccountSchema"
import { ResponseSchema } from "./BaseSchema"
import { ClothingSchema } from "./ClothingSchema"
import { ContactSchema } from "./ContactSchema"
import { GenderEnum } from "./GenderEnum"
import { MaritalStatusEnum } from "./MaritalStatusEnum"

export const EmployeeSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    fullName: z.string(),
    taxId: z.string(),
    nationalId: z.string(),
    dateOfBirth: z.string(),
    issuingBody: z.string(),
    registration: z.string(),
    supervisor: z.boolean(),
    manager: z.boolean(),
    salary: z.number(),
    contractDate: z.string(),
    removalDate: z.string().optional(),
    function: z.number(),
    address: AddressSchema.optional(),
    contact: ContactSchema.optional(),
    bank: BankAccountSchema.optional(),
    clothing: ClothingSchema.optional(),
    gender: z.nativeEnum(GenderEnum),
    maritalStatus: z.nativeEnum(MaritalStatusEnum),
    is_active: z.boolean().optional(),
})

export const EmployeeResponseSchema = EmployeeSchema.merge(ResponseSchema)

export type EmployeeInput = z.infer<typeof EmployeeSchema>
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>
