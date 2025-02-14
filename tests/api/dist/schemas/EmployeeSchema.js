"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeResponseSchema = exports.EmployeeSchema = void 0;
const zod_1 = require("zod");
const BankAccountSchema_1 = require("./BankAccountSchema");
const AddressSchema_1 = require("./AddressSchema");
const ContactSchema_1 = require("./ContactSchema");
const ClothingSchema_1 = require("./ClothingSchema");
const BaseSchema_1 = require("./BaseSchema");
const MaritalStatusEnum_1 = require("./MaritalStatusEnum");
const GenderEnum_1 = require("./GenderEnum");
exports.EmployeeSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string(),
    full_name: zod_1.z.string(),
    tax_id: zod_1.z.string(),
    national_id: zod_1.z.string(),
    date_of_birth: zod_1.z.string(),
    issuing_body: zod_1.z.string(),
    registration: zod_1.z.string(),
    supervisor: zod_1.z.boolean(),
    manager: zod_1.z.boolean(),
    salary: zod_1.z.number(),
    contract_date: zod_1.z.string(),
    removal_date: zod_1.z.string().optional(),
    function: zod_1.z.number(),
    address: AddressSchema_1.AddressSchema.optional(),
    contact: ContactSchema_1.ContactSchema.optional(),
    bank: BankAccountSchema_1.BankAccountSchema.optional(),
    clothing: ClothingSchema_1.ClothingSchema.optional(),
    gender: zod_1.z.nativeEnum(GenderEnum_1.GenderEnum),
    marital_status: zod_1.z.nativeEnum(MaritalStatusEnum_1.MaritalStatusEnum),
    is_active: zod_1.z.boolean().optional(),
});
exports.EmployeeResponseSchema = exports.EmployeeSchema.merge(BaseSchema_1.ResponseSchema);
