"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletedResponseSchema = exports.ResponseSchema = void 0;
const zod_1 = require("zod");
exports.ResponseSchema = zod_1.z.object({
    version: zod_1.z.number().optional(),
    created_at: zod_1.z.string().datetime(),
    updated_at: zod_1.z.string().datetime().optional(),
    // is_active: z.boolean(),
});
exports.DeletedResponseSchema = zod_1.z.object({
    id: zod_1.z.number(),
    version: zod_1.z.number().optional(),
    deleted_at: zod_1.z.string().datetime().optional(),
    is_active: zod_1.z.boolean(),
});
