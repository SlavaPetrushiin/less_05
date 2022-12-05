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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceJWT = void 0;
const refreshToken_db_repository_1 = require("./../repositories/refreshToken-db-repository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const JWT_SECRET = process.env.ACCESS_JWT_SECRET || 'sdfwpsvd';
const EXPIRES_ACCESS_TIME = '10s';
const EXPIRES_REFRESH_TIME = '20s';
class ServiceJWT {
    static addJWT(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_ACCESS_TIME });
                return token;
            }
            catch (error) {
                return null;
            }
        });
    }
    static addRefreshToken(userId, ipAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: EXPIRES_REFRESH_TIME });
                const refreshToken = {
                    user: userId,
                    token: token,
                    createdByIp: ipAddress
                };
                yield refreshToken_db_repository_1.RefreshTokensRepository.addRefreshToken(refreshToken);
                return refreshToken.token;
            }
            catch (error) {
                return null;
            }
        });
    }
    static updateRefreshToken(userId, ipAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: EXPIRES_ACCESS_TIME });
                const token = jsonwebtoken_1.default.sign({ userId }, process.env.REFRESH_JWT_SECRET, { expiresIn: EXPIRES_REFRESH_TIME });
                const refreshToken = {
                    user: userId,
                    token: token,
                    createdByIp: ipAddress
                };
                let result = yield refreshToken_db_repository_1.RefreshTokensRepository.updateRefreshToken(refreshToken);
                if (!result) {
                    return null;
                }
                return { accessToken, refreshToken: refreshToken.token };
            }
            catch (error) {
                return null;
            }
        });
    }
    static getUserIdByToken(token, secretKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, secretKey);
                return decoded.userId;
            }
            catch (error) {
                return null;
            }
        });
    }
    static removeRefreshToken(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return refreshToken_db_repository_1.RefreshTokensRepository.removeRefreshTokenByUserID(userId);
        });
    }
}
exports.ServiceJWT = ServiceJWT;
