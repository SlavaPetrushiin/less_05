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
exports.RefreshTokensRepository = void 0;
const db_1 = require("./db");
class RefreshTokenModel {
    addRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.refreshTokensCollection.insertOne(refreshToken);
                return result.acknowledged;
            }
            catch (error) {
                console.error('Not create RefreshToken');
                return false;
            }
        });
    }
    updateRefreshToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { user, token, createdByIp } = refreshToken;
                let result = yield db_1.refreshTokensCollection.updateOne({ user }, { $set: { token, createdByIp } });
                if (result.matchedCount === 0) {
                    return false;
                }
                return true;
            }
            catch (error) {
                console.log('Not updated RefreshToken');
                return false;
            }
        });
    }
    getRefreshTokenByUSerID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return db_1.refreshTokensCollection.findOne({ id: userID }, { projection: { _id: false } });
            }
            catch (error) {
                return null;
            }
        });
    }
    removeRefreshTokenByUserID(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.refreshTokensCollection.deleteMany({ user: userID });
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.RefreshTokensRepository = new RefreshTokenModel();
