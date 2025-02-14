"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactSchema = void 0;
const zod_1 = require("zod");
exports.ContactSchema = zod_1.z.object({
    phone_number: zod_1.z
        .string(),
    email: zod_1.z
        .string(),
    website: zod_1.z
        .string(),
});
