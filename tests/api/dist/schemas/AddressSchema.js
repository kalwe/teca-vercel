"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const zod_1 = require("zod");
exports.AddressSchema = zod_1.z.object({
    street: zod_1.z
        .string(),
    number: zod_1.z
        .string(),
    neighborhood: zod_1.z
        .string(),
    city: zod_1.z
        .string(),
    zip_code: zod_1.z
        .string(),
    state: zod_1.z
        .string(),
});
