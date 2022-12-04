import { ApiTypes } from './../types/types';
import { refreshTokensCollection, usersCollection } from "./db";



class RefreshTokenModel {
	public async addRefreshToken(refreshToken: ApiTypes.IRefreshToken):Promise<boolean>{
		try {
			let result = await refreshTokensCollection.insertOne(refreshToken);
			return result.acknowledged;
		} catch (error) {
			console.error('Not create RefreshToken');
			return false;
		}
	}

	public async updateRefreshToken(refreshToken: ApiTypes.IRefreshToken): Promise<boolean>{
		try {
			let {user, token, createdByIp} = refreshToken;
			console.log(user, token, createdByIp);
			let result = await refreshTokensCollection.updateOne({ user }, { $set: { token,  createdByIp}});
			if (result.matchedCount == 0) {
				return false;
			}
			return true;
		} catch (error) {
			console.log('Not updated RefreshToken');
			return false;
		}
	}

	public async getRefreshTokenByUSerID(userID: string): Promise<ApiTypes.IRefreshToken | null>{
		try {
			return refreshTokensCollection.findOne({id: userID}, {projection: {_id: false}});
		} catch (error) {
			return null;
		}
	}

	public async removeRefreshTokenByUserID(userID: string): Promise<boolean>{
		try {
			console.log("removeRefreshTokenByUserID: ", userID);
			let result = await refreshTokensCollection.deleteMany({user: userID});
			return result.deletedCount > 0 ? true : false;
		} catch (error) {
			return false;
		}
	}
}

export const RefreshTokensRepository = new RefreshTokenModel();