import { z } from "zod"

import { BankAccountSchema } from "./BankAccountSchema"
import { AddressSchema } from "./AddressSchema"
import { ContactSchema  }from "./ContactSchema"
import { ClothingSchema } from "./ClothingSchema"
import { ResponseSchema } from "./BaseSchema"
import { MaritalStatusEnum } from "./MaritalStatusEnum"
import { GenderEnum } from "./GenderEnum"

export const EmployeeSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    full_name: z.string(),
    tax_id: z.string(),
    national_id: z.string(),
    date_of_birth: z.string(),
    issuing_body: z.string(),
    registration: z.string(),
    supervisor: z.boolean(),
    manager: z.boolean(),
    salary: z.number(),
    contract_date: z.string(),
    removal_date: z.string().optional(),
    function: z.number(),
    address: AddressSchema.optional(),
    contact: ContactSchema.optional(),
    bank: BankAccountSchema.optional(),
    clothing: ClothingSchema.optional(),
    gender: z.nativeEnum(GenderEnum),
    marital_status: z.nativeEnum(MaritalStatusEnum),
    is_active: z.boolean().optional(),
})

export const EmployeeResponseSchema = EmployeeSchema.merge(ResponseSchema)

export type EmployeeInput = z.infer<typeof EmployeeSchema>
export type EmployeeResponse = z.infer<typeof EmployeeResponseSchema>
