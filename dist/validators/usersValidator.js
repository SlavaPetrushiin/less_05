"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidator = exports.loginValidator = void 0;
const clients_db_repository_1 = require("./../repositories/clients-db-repository");
const express_validator_1 = require("express-validator");
const checkEmail = (email) => {
    let pattern = new RegExp('^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$');
    return pattern.test(email);
};
const checkEmailOrLogin = (emailOrLogin) => __awaiter(void 0, void 0, void 0, function* () {
    let client = yield clients_db_repository_1.ClientsRepository.getClientByEmailOrLogin(emailOrLogin);
    if (client) {
        console.log("ERROR");
        return Promise.reject();
    }
});
exports.loginValidator = [
    (0, express_validator_1.body)("loginOrEmail").isString().isLength({ min: 3, max: 10 }).withMessage("login должен быть от 3 до 10 символов"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6, max: 20 }).withMessage("Пароль должен быть от 6 до 20 символов"),
];
exports.userValidator = [
    (0, express_validator_1.body)("login")
        .isString()
        .isLength({ min: 3, max: 10 })
        .withMessage("login должен быть от 3 до 10 символов")
        .custom(checkEmailOrLogin)
        .withMessage("Пользователь с таким логином существует"),
    (0, express_validator_1.body)("password").isString().isLength({ min: 6, max: 20 }).withMessage("Пароль должен быть от 6 до 20 символов"),
    (0, express_validator_1.body)("email")
        .isString()
        .isEmail()
        .withMessage("Укажите валидный email")
        .custom(checkEmailOrLogin)
        .withMessage("Пользователь с таким email существует"),
];
