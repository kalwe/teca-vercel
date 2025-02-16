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
    name: z.string().optional(),
    full_name: z.string().optional(),
    tax_id: z.string().optional(),
    national_id: z.string().optional(),
    date_of_birth: z.string().optional(),
    issuing_body: z.string().optional(),
    registration: z.string().optional(),
    supervisor: z.boolean().optional(),
    manager: z.boolean().optional(),
    salary: z.number().optional(),
    contract_date: z.string().optional(),
    removal_date: z.string().optional(),
    function: z.number().optional(),
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
