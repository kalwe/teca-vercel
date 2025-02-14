"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserSchema_1 = require("../schemas/UserSchema");
const BaseSchema_1 = require("../schemas/BaseSchema");
const userRouter = (0, express_1.Router)();
// simulate database
let usersDB = [];
// createUser(userData: UserType)
userRouter.post('/user', (req, res) => {
    const user = req.body;
    const isValidUserInput = UserSchema_1.UserSchema.parse(Object.assign({}, user));
    const date = new Date();
    const isValidUser = UserSchema_1.UserResponseSchema.parse(Object.assign(Object.assign({}, isValidUserInput), { id: Math.floor(Math.random() * 6) + 1, created_at: date.toJSON(), is_active: true }));
    usersDB.push(isValidUser);
    res.status(201).json(isValidUser);
});
// getAllUsers()
userRouter.get('/user', (req, res) => {
    res.status(200).json(usersDB);
});
// getById(id: number)
userRouter.get('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = usersDB.filter((u) => u.id == id);
    res.status(200).json(user);
});
// deleteById(id: number)
userRouter.delete('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = usersDB.filter((u) => u.id == id);
    const date = new Date();
    const deletedUser = BaseSchema_1.DeletedResponseSchema.parse({
        id: user[0].id,
        deleted_at: date.toJSON(),
        is_active: false
    });
    res.status(204).json(deletedUser);
});
exports.default = userRouter;
