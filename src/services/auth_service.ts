
import { ModifyResult } from 'mongodb';
import { ApiTypes } from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { ClientsRepository } from '../repositories/clients-db-repository';
import { Email } from '../lib/email';
const bcrypt = require('bcrypt');


function getUrlWithCode(code: string): string {
	return `
			<h1>Thank for your registration</h1>
			<p>To finish registration please follow the link below:
				<a href='https://somesite.com/confirm-email?code=${code}'>complete registration</a>
		</p>
	`
}

async function hasPassword(password: string): Promise<string | null> {
	try {
		const salt = await bcrypt.genSalt(10)
		return await bcrypt.hash(password, salt);
	} catch (error) {
		console.error(error);
	}
	return null;
}

async function comparePassword(password: string, hash: string): Promise<boolean> {
	try {
		return await bcrypt.compare(password, hash);
	} catch (error) {
		console.error(error);
	}

	return false;
}

export class AuthService {
	static async login(loginOrEmail: string, password: string): Promise<ApiTypes.IClientDB | null> {
		let user = await ClientsRepository.getClientByEmailOrLogin(loginOrEmail);
		console.log(user);
		if (!user) {
			return null;
		}

		let isValidPass = await comparePassword(password, user.hasPassword);

		if (!isValidPass) {
			return null;
		}

		return user;
	}

	static async registration(login: string, email: string, password: string): Promise<ApiTypes.IClientDB | null> {
		let isFoundedCandidate = await ClientsRepository.getClientByEmailOrLogin(login, email);

		if(isFoundedCandidate){
			return null;
		}

		const passwordHash = await hasPassword(password);
		const id = new Date().getMilliseconds().toString();
		const createdAt = new Date().toISOString();
		if (!passwordHash) {
			return null;
		}

		let client: ApiTypes.IClientDB = {
			email,
			login,
			id,
			createdAt,
			hasPassword: passwordHash,
			emailConfirmation: {
				code: uuidv4(),
				expirationData: add(new Date(), { hours: 1, minutes: 3 }),
				isConfirmed: false
			}
		}

		let isCreatedClient = await ClientsRepository.createClient(client);

		if (!isCreatedClient) {
			return null;
		}
		let url = getUrlWithCode(client.emailConfirmation.code);
		const isSentEmail = await Email.sendEmail(client.email, url);

		// if (!isSentEmail) {
		// 	return null;
		// }

		return client;
	}

	static async confirmCode(code: string): Promise<ModifyResult<ApiTypes.IClientDB> | null> {
		let client = await ClientsRepository.getClientByCode(code);
		if (!client) return null;
		if (client.emailConfirmation.code != code) return null;
		if (client.emailConfirmation.isConfirmed) return null;
		if (new Date() > client.emailConfirmation.expirationData) return null;

		let isUpdateConfirm = await ClientsRepository.updateConfirmation(client.id);

		if (!isUpdateConfirm) {
			return null;
		}

		return isUpdateConfirm;
	}

	static async confirmResending(emailOrLogin: string): Promise<ModifyResult<ApiTypes.IClientDB> | null> {
		let client = await ClientsRepository.getClientByEmailOrLogin(emailOrLogin);
		console.log(client);
		if (!client) return null;
		//if (client.emailConfirmation.isConfirmed) return null;

		let newCode = uuidv4();
		let newExpirationData = add(new Date(), { hours: 1, minutes: 3 });
		let isUpdatedClient = await ClientsRepository.updateClient(client.id, newCode, newExpirationData);
		console.log(isUpdatedClient);
		if (!isUpdatedClient) {
			return null;
		}

		let url = getUrlWithCode(client.emailConfirmation.code);
		const isResendingCode = await Email.sendEmail(client.email, url);

		if (!isResendingCode) {
			return null;
		}

		return isUpdatedClient;
	}
}