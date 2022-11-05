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
exports.UsersRepository = void 0;
const db_1 = require("./db");
class UsersRepositoryModel {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.usersCollection.insertOne(user);
                return result.acknowledged;
            }
            catch (error) {
                return false;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.usersCollection.deleteOne({ id });
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
    deleteUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.usersCollection.deleteMany({});
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.UsersRepository = new UsersRepositoryModel();
