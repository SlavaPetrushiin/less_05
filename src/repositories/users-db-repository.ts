import { ApiTypes } from './../types/types';
import { usersCollection } from "./db";



class UsersRepositoryModel {
	public async createUser(user: ApiTypes.IUserDB): Promise<boolean> {
		try {
			let result = await usersCollection.insertOne(user);
			return result.acknowledged;
		} catch (error) {
			return false;
		}
	}

	public async deleteUser(id: string): Promise<boolean> {
		try {
			let result = await usersCollection.deleteOne({id});
			return result.deletedCount > 0 ? true : false;
		} catch (error) {
			return false;
		}
	}

	public async deleteUsers(): Promise<boolean> {
		try {
			let result = await usersCollection.deleteMany({});
			return result.deletedCount > 0 ? true : false;
		} catch (error) {
			return false;
		}
	}
}

export const  UsersRepository = new UsersRepositoryModel();