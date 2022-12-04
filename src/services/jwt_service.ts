import { RefreshTokensRepository } from './../repositories/refreshToken-db-repository';
import jwt from "jsonwebtoken";
import { ApiTypes } from "../types/types";
import * as dotenv from 'dotenv';
import { add } from "date-fns";
dotenv.config();

const JWT_SECRET = process.env.ACCESS_JWT_SECRET || 'sdfwpsvd';

export interface TokenInterface {
	userId: string;
}

export class ServiceJWT {
	static async addJWT(userId: string): Promise<string | null> {
		try {
			let token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
			return token;
		} catch (error) {
			return null;
		}
	}

	static async addRefreshToken(userId: string, ipAddress: string) {
		try {
			const token = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET!, { expiresIn: '3h' })
			const refreshToken = {
				user: userId,
				token: token,
				createdByIp: ipAddress
			}
			await RefreshTokensRepository.addRefreshToken(refreshToken);
			return refreshToken.token;
		} catch (error) {
			return null;
		}
	}

	static async updateRefreshToken(userId: string, ipAddress: string): Promise<{accessToken: string, refreshToken: string} | null> {
		try {
			const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
			const token = jwt.sign({ userId }, process.env.REFRESH_JWT_SECRET!, { expiresIn: '3h' })
			const refreshToken = {
				user: userId,
				token: token,
				createdByIp: ipAddress
			}

			let result = await RefreshTokensRepository.updateRefreshToken(refreshToken);
console.log("RESULT: ", result);
			if (!result) {
				return null;
			}

			return { accessToken, refreshToken: refreshToken.token };
		} catch (error) {
			return null;
		}
	}

	static async getUserIdByToken(token: string, secretKey: string): Promise<string | null> {
		try {
			const decoded = jwt.verify(token, secretKey) as TokenInterface;
			return decoded.userId;
		} catch (error) {
			return null;
		}
	}

	static async removeRefreshToken(userId: string){
		return RefreshTokensRepository.removeRefreshTokenByUserID(userId);
	}

}

