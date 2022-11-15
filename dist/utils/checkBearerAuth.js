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
exports.checkBearerAuth = void 0;
const query_db_repository_1 = require("./../repositories/query-db-repository");
const jwt_service_1 = require("./../services/jwt_service");
const checkBearerAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    let token = req.headers.authorization.split(" ")[1] || "";
    const userId = yield jwt_service_1.ServiceJWT.getUserIdByToken(token);
    if (!userId) {
        return res.sendStatus(401);
    }
    let user = yield query_db_repository_1.QueryRepository.getUser({ id: userId });
    if (!user) {
        return res.sendStatus(401);
    }
    req.user = { email: user === null || user === void 0 ? void 0 : user.email, login: user === null || user === void 0 ? void 0 : user.login, userId: user === null || user === void 0 ? void 0 : user.id };
    next();
});
exports.checkBearerAuth = checkBearerAuth;
