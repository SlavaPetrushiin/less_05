import  jwt from "jsonwebtoken";
import { ApiTypes } from "../types/types";

const JWT_SECRET =  process.env.ACCESS_JWT_SECRET || 'sdfwpsvd';

export class ServiceJWT{
	static async addJWT(user: ApiTypes.IUserDB): Promise<string | null>{
		try {
			const {id} = user;
			let token =  jwt.sign({useeId: id}, JWT_SECRET, {expiresIn: '1h'});
			console.log(token)
			return  token 
		} catch (error) {
			return null;
		}
	}

	static async getUserIdByToken(token: string): Promise<string | null>{
		try {
			const decoded: any = jwt.verify(token, JWT_SECRET);
			return decoded.useeId;
		} catch (error) {
			return null;
		}
	}
}

