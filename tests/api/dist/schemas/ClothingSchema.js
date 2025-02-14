"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClothingSchema = void 0;
const zod_1 = require("zod");
exports.ClothingSchema = zod_1.z.object({
    shirt_size: zod_1.z
        .string(),
    pants_size: zod_1.z
        .string(),
    shoe_size: zod_1.z
        .string(),
});
