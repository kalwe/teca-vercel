"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseSchema = exports.UserSchema = void 0;
const zod_1 = require("zod");
const BaseSchema_1 = require("./BaseSchema");
exports.UserSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string().min(4),
    email: zod_1.z.string().email().trim(),
    password: zod_1.z.string().min(6),
    is_active: zod_1.z.boolean().optional(),
});
exports.UserResponseSchema = exports.UserSchema.merge(BaseSchema_1.ResponseSchema);
