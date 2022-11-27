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
exports.routerUsers = void 0;
const query_db_repository_1 = require("./../repositories/query-db-repository");
const checkBasicAuth_1 = require("../utils/checkBasicAuth");
const users_service_1 = require("./../services/users_service");
const checkError_1 = require("./../utils/checkError");
const express_1 = __importDefault(require("express"));
const usersValidator_1 = require("../validators/usersValidator");
const checkQueryUsers_1 = require("../utils/checkQueryUsers");
const auth_service_1 = require("../services/auth_service");
exports.routerUsers = express_1.default.Router();
exports.routerUsers.get("/", checkBasicAuth_1.checkBasicAuth, checkQueryUsers_1.checkQueryUsers, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query;
    let users = yield query_db_repository_1.QueryRepository.getUsers({
        pageNumber: pageNumber,
        pageSize: pageSize,
        searchEmailTerm: searchEmailTerm,
        searchLoginTerm: searchLoginTerm,
        sortBy: sortBy,
        sortDirection: sortDirection
    });
    if (!users) {
        res.sendStatus(404);
        return;
    }
    res.send(users);
}));
exports.routerUsers.post("/", checkBasicAuth_1.checkBasicAuth, usersValidator_1.userValidator, checkError_1.checkError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, login, password } = req.body;
    let newUser = yield auth_service_1.AuthService.registration(email, login, password);
    if (!newUser) {
        return res.sendStatus(404);
    }
    return res.status(201).send(newUser);
}));
exports.routerUsers.delete("/", checkBasicAuth_1.checkBasicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    users_service_1.UsersService.deleteUsers();
    res.sendStatus(204);
}));
exports.routerUsers.delete("/:id", checkBasicAuth_1.checkBasicAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = req.params;
    let isDeleted = yield users_service_1.UsersService.deleteUser(id);
    if (!isDeleted) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
}));
