"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const checkEmail = (email) => {
    let pattern = new RegExp('^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return pattern.test(email);
};
exports.loginValidator = [
    (0, express_validator_1.body)("loginOrEmail").isString().isLength({ min: 3, max: 10 }).withMessage("KJuby должен быть от 3 до 10 символов"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6, max: 20 }).withMessage("Пароль должен быть от 6 до 20 символов"),
];
exports.userValidator = [
    (0, express_validator_1.body)("login").isString().isLength({ min: 3, max: 10 }).withMessage("login должен быть от 3 до 10 символов"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6, max: 20 }).withMessage("Пароль должен быть от 6 до 20 символов"),
    (0, express_validator_1.body)("email").isString().isEmail().withMessage("Укажите валидный email"),
];
