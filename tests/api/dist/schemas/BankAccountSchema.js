"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountSchema = void 0;
const zod_1 = require("zod");
exports.BankAccountSchema = zod_1.z.object({
    bank: zod_1.z.string(),
    agency: zod_1.z.string(),
    account: zod_1.z.string(),
    account_type: zod_1.z.string()
});
