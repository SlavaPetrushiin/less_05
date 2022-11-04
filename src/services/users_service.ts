import { QueryRepository } from './../repositories/query-db-repository';
import { UsersRepository } from "../repositories/users-db-repository";
import { ApiTypes } from "../types/types";
const bcrypt = require('bcrypt');

type ResponseCreateUser = Promise<Omit<ApiTypes.IUserDB, 'hasPassword'> | null>;

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

export class UsersService {
	static async login(login: string, password: string): Promise<ApiTypes.IUserDB | null>{
		let user = await QueryRepository.getUser(login);
		console.log(user);
		if(!user){
			return null;
		}

		let isValidPass = await comparePassword(password, user.hasPassword);

		if(!isValidPass){
			return null;
		}

		return user;
	}

	static async createUser(email: string, login: string, password: string): ResponseCreateUser {
		const id = new Date().getMilliseconds().toString();
		const createdAt = new Date().toISOString();
		const candidate = await QueryRepository.getUser(login);
		const hasPass = await hasPassword(password);

		if(candidate || !hasPass){
			return null;
		}

		const newUser: ApiTypes.IUserDB  = { email, login, id, createdAt, hasPassword:  hasPass};

		const isCreatedUser = await UsersRepository.createUser(newUser);
		return isCreatedUser ? { email, login, id, createdAt} : null;
	}

	static async deleteUser(id: string): Promise<boolean> {
		return UsersRepository.deleteUser(id);
	}
}