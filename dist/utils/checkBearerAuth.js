"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const clients_db_repository_1 = require("./../repositories/clients-db-repository");
const jwt_service_1 = require("./../services/jwt_service");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const checkBearerAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }
    let token = req.headers.authorization.split(" ")[1] || "";
    const userId = yield jwt_service_1.ServiceJWT.getUserIdByToken(token, process.env.ACCESS_JWT_SECRET);
    if (!userId) {
        return res.sendStatus(401);
    }
    let user = yield clients_db_repository_1.ClientsRepository.getUSerByID(userId);
    if (!user) {
        return res.sendStatus(401);
    }
    req.user = { email: user === null || user === void 0 ? void 0 : user.email, login: user === null || user === void 0 ? void 0 : user.login, userId: user === null || user === void 0 ? void 0 : user.id };
    next();
});
exports.checkBearerAuth = checkBearerAuth;
