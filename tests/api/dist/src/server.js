"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = __importDefault(require("../routes/userRouter"));
const employeeRouter_1 = __importDefault(require("../routes/employeeRouter"));
dotenv_1.default.config();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3001;
const app = (0, express_1.default)();
const route = (0, express_2.Router)();
const allowedOrigins = [`http://${host}:${port}`];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.use(route);
// health-check
app.get('/', (req, res) => {
    res.json({ message: "OK" });
});
app.use(userRouter_1.default);
app.use(employeeRouter_1.default);
app.listen(port, () => {
    console.log(`[server]: Server is running art http://${host}:${port}`);
}).on("error", (error) => {
    throw new Error(error.message);
});
