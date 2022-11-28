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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerAuth = void 0;
const checkBearerAuth_1 = require("./../utils/checkBearerAuth");
const checkError_1 = require("./../utils/checkError");
const express_1 = __importDefault(require("express"));
const usersValidator_1 = require("../validators/usersValidator");
const jwt_service_1 = require("../services/jwt_service");
const auth_service_1 = require("../services/auth_service");
exports.routerAuth = express_1.default.Router();
exports.routerAuth.get('/me', checkBearerAuth_1.checkBearerAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.user;
    res.send(user);
}));
exports.routerAuth.post('/login', usersValidator_1.loginValidator, checkError_1.checkErrorAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { loginOrEmail, password } = req.body;
    let user = yield auth_service_1.AuthService.login(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    if (!user.emailConfirmation.isConfirmed) {
        res.sendStatus(401);
        return;
    }
    if (!user.emailConfirmation.isConfirmed) {
        res.sendStatus(401);
        return;
    }
    const accessToken = yield jwt_service_1.ServiceJWT.addJWT(user);
    if (!accessToken) {
        res.sendStatus(401);
        return;
    }
    res.send({ accessToken });
}));
exports.routerAuth.post('/registration', usersValidator_1.userValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { login, password, email } = req.body;
    let result = yield auth_service_1.AuthService.registration(login, email, password);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
}));
exports.routerAuth.post('/registration-confirmation', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { code } = req.body;
    let result = yield auth_service_1.AuthService.confirmCode(code);
    console.log("registration-confirmation: ", result);
    if (!result) {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Не валидный код",
                    "field": "code"
                }
            ]
        });
        return;
    }
    res.sendStatus(204);
}));
exports.routerAuth.post('/registration-email-resending', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email } = req.body;
    console.log(email);
    let result = yield auth_service_1.AuthService.confirmResending(email);
    if (!result) {
        res.status(400).send({
            "errorsMessages": [
                {
                    "message": "Нет такого email",
                    "field": "email"
                }
            ]
        });
        return;
    }
    res.sendStatus(204);
}));
