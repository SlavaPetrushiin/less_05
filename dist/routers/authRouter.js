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
const checkError_1 = require("./../utils/checkError");
const express_1 = __importDefault(require("express"));
const usersValidator_1 = require("../validators/usersValidator");
const users_service_1 = require("./../services/users_service");
exports.routerAuth = express_1.default.Router();
exports.routerAuth.post('/', usersValidator_1.loginValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { login, password } = req.body;
    let isAuth = yield users_service_1.UsersService.login(login, password);
    debugger;
    if (!isAuth) {
        res.sendStatus(401);
        return;
    }
    res.sendStatus(204);
}));
