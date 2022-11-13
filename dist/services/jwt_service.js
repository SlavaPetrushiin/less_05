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
exports.ServiceJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.ACCESS_JWT_SECRET || 'sdfwpsvd';
class ServiceJWT {
    static addJWT(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = user;
                let token = jsonwebtoken_1.default.sign({ useeId: id }, JWT_SECRET, { expiresIn: '1h' });
                console.log(token);
                return token;
            }
            catch (error) {
                return null;
            }
        });
    }
    static getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                return decoded.useeId;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.ServiceJWT = ServiceJWT;
