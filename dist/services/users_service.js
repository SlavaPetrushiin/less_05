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
exports.UsersService = void 0;
const clients_db_repository_1 = require("./../repositories/clients-db-repository");
const query_db_repository_1 = require("./../repositories/query-db-repository");
const bcrypt = require('bcrypt');
function hasPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const salt = yield bcrypt.genSalt(10);
            return yield bcrypt.hash(password, salt);
        }
        catch (error) {
            console.error(error);
        }
        return null;
    });
}
function comparePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield bcrypt.compare(password, hash);
        }
        catch (error) {
            console.error(error);
        }
        return false;
    });
}
class UsersService {
    static login(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield query_db_repository_1.QueryRepository.getUser({ login });
            if (!user) {
                return null;
            }
            let isValidPass = yield comparePassword(password, user.hasPassword);
            if (!isValidPass) {
                return null;
            }
            return user;
        });
    }
    static createUser(email, login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = new Date().getMilliseconds().toString();
            const createdAt = new Date().toISOString();
            const hasPass = yield hasPassword(password);
            if (!hasPass) {
                return null;
            }
            const newUser = {
                email,
                login,
                id,
                createdAt,
                hasPassword: hasPass,
                emailConfirmation: {
                    code: "",
                    expirationData: new Date(),
                    isConfirmed: false
                }
            };
            const isCreatedUser = yield clients_db_repository_1.ClientsRepository.createClient(newUser);
            return isCreatedUser ? { email, login, id, createdAt } : null;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return clients_db_repository_1.ClientsRepository.deleteUser(id);
        });
    }
    static deleteUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return clients_db_repository_1.ClientsRepository.deleteUsers();
        });
    }
}
exports.UsersService = UsersService;
