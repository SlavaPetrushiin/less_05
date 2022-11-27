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
exports.AuthService = void 0;
const uuid_1 = require("uuid");
const date_fns_1 = require("date-fns");
const clients_db_repository_1 = require("../repositories/clients-db-repository");
const email_1 = require("../lib/email");
const bcrypt = require('bcrypt');
function getUrlWithCode(code) {
    return `
			<h1>Thank for your registration</h1>
			<p>To finish registration please follow the link below:
				<a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
		</p>
	`;
}
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
class AuthService {
    static login(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield clients_db_repository_1.ClientsRepository.getClientByEmailOrLogin(loginOrEmail);
            console.log(user);
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
    static registration(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHash = yield hasPassword(password);
            const id = new Date().getMilliseconds().toString();
            const createdAt = new Date().toISOString();
            if (!passwordHash) {
                return null;
            }
            let client = {
                email,
                login,
                id,
                createdAt,
                hasPassword: passwordHash,
                emailConfirmation: {
                    code: (0, uuid_1.v4)(),
                    expirationData: (0, date_fns_1.add)(new Date(), { hours: 1, minutes: 3 }),
                    isConfirmed: false
                }
            };
            let isCreatedClient = yield clients_db_repository_1.ClientsRepository.createClient(client);
            if (!isCreatedClient) {
                return null;
            }
            let url = getUrlWithCode(client.emailConfirmation.code);
            const isSentEmail = yield email_1.Email.sendEmail(client.email, url);
            // if (!isSentEmail) {
            // 	return null;
            // }
            return client;
        });
    }
    static confirmCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield clients_db_repository_1.ClientsRepository.getClientByCode(code);
            if (!client)
                return null;
            if (client.emailConfirmation.code != code)
                return null;
            if (client.emailConfirmation.isConfirmed)
                return null;
            if (new Date() > client.emailConfirmation.expirationData)
                return null;
            let isUpdateConfirm = yield clients_db_repository_1.ClientsRepository.updateConfirmation(client.id);
            if (!isUpdateConfirm) {
                return null;
            }
            return isUpdateConfirm;
        });
    }
    static confirmResending(emailOrLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = yield clients_db_repository_1.ClientsRepository.getClientByEmailOrLogin(emailOrLogin);
            if (!client)
                return null;
            if (client.emailConfirmation.isConfirmed)
                return null;
            let newCode = (0, uuid_1.v4)();
            let newExpirationData = (0, date_fns_1.add)(new Date(), { hours: 1, minutes: 3 });
            let isUpdatedClient = yield clients_db_repository_1.ClientsRepository.updateClient(client.id, newCode, newExpirationData);
            if (!isUpdatedClient) {
                return null;
            }
            let url = getUrlWithCode(client.emailConfirmation.code);
            const isResendingCode = yield email_1.Email.sendEmail(client.email, url);
            if (!isResendingCode) {
                return null;
            }
            return isUpdatedClient;
        });
    }
}
exports.AuthService = AuthService;