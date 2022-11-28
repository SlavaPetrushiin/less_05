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
exports.ClientsRepository = void 0;
const db_1 = require("./db");
class ClientsRepositoryModel {
    createClient(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.clientsCollection.insertOne(user);
                return result.acknowledged;
            }
            catch (error) {
                return false;
            }
        });
    }
    getClientByCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.clientsCollection.findOne({ 'emailConfirmation.code': code }, { projection: { _id: false } });
            }
            catch (error) {
                console.error(`ClientsRepositoryModel, Not found client by code: ${code}`);
                return null;
            }
        });
    }
    updateConfirmation(clientID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.clientsCollection.findOneAndUpdate({ id: clientID }, { $set: { 'emailConfirmation.isConfirmed': true } });
            }
            catch (error) {
                console.error(`ClientsRepositoryModel, Not found client by clientID: ${clientID}`);
                return null;
            }
        });
    }
    getClientByEmailOrLogin(emailOrLogin, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (email) {
                    return yield db_1.clientsCollection.findOne({ $or: [{ login: emailOrLogin }, { email: email }] });
                }
                return yield db_1.clientsCollection.findOne({ $or: [{ login: emailOrLogin }, { email: emailOrLogin }] });
            }
            catch (error) {
                console.error(`ClientsRepositoryModel, Not found client by emailOrLogin: ${emailOrLogin}`);
                return null;
            }
        });
    }
    updateClient(id, code, expirationData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(id, code, expirationData);
                return yield db_1.clientsCollection.findOneAndUpdate({ id }, { $set: [{ 'emailConfirmation.code': code }, { 'emailConfirmation.expirationData': expirationData }] });
            }
            catch (error) {
                console.error(`ClientsRepositoryModel, Not updateClient`);
                return null;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield db_1.clientsCollection.deleteOne({ id });
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
                let result = yield db_1.clientsCollection.deleteMany({});
                return result.deletedCount > 0 ? true : false;
            }
            catch (error) {
                return false;
            }
        });
    }
    getUSerByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.clientsCollection.findOne({ id });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.ClientsRepository = new ClientsRepositoryModel();
