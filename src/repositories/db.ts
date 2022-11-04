import { MongoClient } from "mongodb";
import { ApiTypes } from "../types/types";

const url = process.env.mongoURL || 'mongodb+srv://admin:Atg-CC6-y2A-B5H@cluster0.uk9jguo.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(url);
const dbName = "blogsAndPosts";
export const db = client.db(dbName);

export const blogsCollection = db.collection<ApiTypes.IBlog>("blogs");
export const postsCollection = db.collection<ApiTypes.IPost>("posts");
export const usersCollection = db.collection<ApiTypes.IUserDB>("users");

export async function runDB(){
	try {
		await client.connect();
		console.log('Connected successfully to server');
	} catch (error) {
		console.error(error);
		//await client.close();
	}
}