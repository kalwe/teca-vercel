"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmployeeSchema_1 = require("../schemas/EmployeeSchema");
const BaseSchema_1 = require("../schemas/BaseSchema");
const employeeRouter = (0, express_1.Router)();
// simulate database
let employeesDB = [];
// createEmployee(employeeData: EmployeeType)
employeeRouter.post('/employee', (req, res) => {
    const employee = req.body;
    const isValidEmployeeInput = EmployeeSchema_1.EmployeeSchema.parse(Object.assign({}, employee));
    const date = new Date();
    const isValidEmployee = EmployeeSchema_1.EmployeeResponseSchema.parse(Object.assign(Object.assign({}, isValidEmployeeInput), { id: Math.floor(Math.random() * 6) + 1, created_at: date.toJSON(), is_active: true }));
    employeesDB.push(isValidEmployee);
    res.status(201).json(isValidEmployee);
});
employeeRouter.get('/employee', (req, res) => {
    res.status(200).json(employeesDB);
});
employeeRouter.get('/employee/:id', (req, res) => {
    const id = Number(req.params.id);
    const employee = employeesDB.filter((u) => u.id == id);
    res.status(200).json(employee);
});
employeeRouter.delete('/employee/:id', (req, res) => {
    const id = Number(req.params.id);
    const employee = employeesDB.filter((u) => u.id == id);
    const date = new Date();
    const deletedEmployee = BaseSchema_1.DeletedResponseSchema.parse({
        id: employee[0].id,
        deleted_at: date.toJSON(),
        is_active: false
    });
    res.status(204).json(deletedEmployee);
});
exports.default = employeeRouter;
